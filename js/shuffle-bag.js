const STORAGE_KEY = 'partyGagShuffleBag';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export class ShuffleBag {
  constructor(ids) {
    this.allIds = [...ids];
    this.load();
  }

  load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.remaining) && saved.remaining.length > 0) {
        const valid = saved.remaining.filter(id => this.allIds.includes(id));
        if (valid.length > 0) {
          this.remaining = valid;
          return;
        }
      }
    } catch (_) { /* ignore */ }
    this.refill();
  }

  refill() {
    this.remaining = shuffle(this.allIds);
    this.save();
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ remaining: this.remaining }));
  }

  next() {
    if (this.remaining.length === 0) this.refill();
    const id = this.remaining.pop();
    this.save();
    return id;
  }

  getStats() {
    return {
      total: this.allIds.length,
      remaining: this.remaining.length,
      seen: this.allIds.length - this.remaining.length,
    };
  }

  reset() {
    this.refill();
  }
}
