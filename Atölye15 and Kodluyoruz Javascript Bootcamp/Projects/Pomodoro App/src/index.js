import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import PomodoroApp from './app';

let pomodoroApp = new PomodoroApp({
  tableTbodySelector: '#table-tbody',
  taskFormSelector: '#task-form',
  startBtnSelector: '#start',
  timerElSelector: '#timer',
  pauseBtnSelector: '#pause',
  breakAudioSelector: '#break_audio',
  playAudioSelector: '#play_audio',
  startAudioSelector: '#start_audio',
});

pomodoroApp.init();
