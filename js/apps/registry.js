import complimentMachine from './compliment-machine.js';
import tapWar from './tap-war.js';
import chaosWheel from './chaos-wheel.js';
import fakeVirus from './fake-virus.js';
import dontPress from './dont-press.js';
import whisperWord from './whisper-word.js';
import stareOff from './stare-off.js';
import hotPotato from './hot-potato.js';
import absurdCaptcha from './absurd-captcha.js';
import rpsDuel from './rps-duel.js';
import exitSurvey from './exit-survey.js';
import fakeCall from './fake-call.js';
import wouldYouRather from './would-you-rather.js';
import syncTap from './sync-tap.js';
import simonSays from './simon-says.js';
import potatoJudge from './potato-judge.js';
import loadingHell from './loading-hell.js';
import fingerSoccer from './finger-soccer.js';
import truthBomb from './truth-bomb.js';
import emergencyMeeting from './emergency-meeting.js';
import reactionNinja from './reaction-ninja.js';
import punIshment from './pun-ishment.js';
import dareRoulette from './dare-roulette.js';
import duckDuckPanic from './duck-duck-panic.js';

export const APPS = [
  complimentMachine,
  tapWar,
  chaosWheel,
  fakeVirus,
  dontPress,
  whisperWord,
  stareOff,
  hotPotato,
  absurdCaptcha,
  rpsDuel,
  exitSurvey,
  fakeCall,
  wouldYouRather,
  syncTap,
  simonSays,
  potatoJudge,
  loadingHell,
  fingerSoccer,
  truthBomb,
  emergencyMeeting,
  reactionNinja,
  punIshment,
  dareRoulette,
  duckDuckPanic,
];

export const APP_MAP = Object.fromEntries(APPS.map(a => [a.id, a]));
