import {
  getDataFromApi,
  addTaskToApi,
  deleteTaskToApi,
  completeTaskOnApi,
} from './data';
import {
  POMODORO_WORK_TIME,
  POMODORO_BREAK_TIME,
  POMODORO_LONG_BREAK_TIME,
} from './constans';
import { getNow, getRemainingDate, addMinutesToDate } from './helpers/date';

class PomodoroApp {
  constructor(options) {
    let {
      tableTbodySelector,
      taskFormSelector,
      startBtnSelector,
      timerElSelector,
      pauseBtnSelector,
      breakAudioSelector,
      playAudioSelector,
      startAudioSelector,
    } = options;
    this.data = [];
    this.$bodyEl = document.querySelector('body');
    this.$tableTbody = document.querySelector(tableTbodySelector);
    this.$taskForm = document.querySelector(taskFormSelector);
    this.$taskFormInput = this.$taskForm.querySelector('#add-task');
    this.$taskFormBtn = this.$taskForm.querySelector('button');
    this.$startBtn = document.querySelector(startBtnSelector);
    this.currentInterval = null;
    this.$timerEl = document.querySelector(timerElSelector);
    this.$pauseBtn = document.querySelector(pauseBtnSelector);
    this.currentRemaining = null;
    this.breakInterval = null;
    this.currentTask = null;
    this.taskCount = null;
    this.$searchInput = this.$taskForm.querySelector('#search-input');
    this.$breakAudio = document.querySelector(breakAudioSelector);
    this.$playAudio = document.querySelector(playAudioSelector);
    this.$startAudio = document.querySelector(startAudioSelector);
  }

  deleteBtnAction() {
    const $deleteButtonEl = document.querySelectorAll('.delete-btn');
    $deleteButtonEl.forEach((element) => {
      element.addEventListener('click', () => {
        deleteTaskToApi(element.id).then((response) => {
          const deleteSelectedRow = this.$tableTbody.querySelectorAll('tr');
          deleteSelectedRow.forEach((el) => {
            el.remove();
          });
          this.fillTasksTable();
        });
      });
    });
  }

  addTask(task) {
    this.$taskFormBtn.textContent = 'Loading';
    this.$taskFormBtn.disabled = true;
    this.$taskFormInput.disabled = true;
    addTaskToApi(task)
      .then((data) => data.json())
      .then((newTask) => {
        this.addTaskToTable(newTask);
        this.$taskFormBtn.textContent = 'Add Task';
        this.$taskFormBtn.disabled = false;
        this.$taskFormInput.disabled = false;
      });
  }

  addTaskToTable(task, index) {
    const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>`;
    const $newTaskEl = document.createElement('tr');
    $newTaskEl.innerHTML = `<th scope="row">${task.id}</th><td>${task.title}</td><td><button id="${task.id}" class="delete-btn">${deleteIcon}</button></td>`;
    $newTaskEl.setAttribute('data-taskId', `task${task.id}`);
    if (task.completed) {
      $newTaskEl.classList.add('completed');
    }
    this.$tableTbody.appendChild($newTaskEl);
    this.$taskFormInput.value = '';
  }

  handleAddTask() {
    this.$taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const task = { title: this.$taskFormInput.value, completed: false };
      this.addTask(task);
    });
  }

  fillTasksTable() {
    getDataFromApi().then((currentTasks) => {
      this.data = currentTasks;
      currentTasks.forEach((task, index) => {
        this.addTaskToTable(task, index + 1);
      });
      this.deleteBtnAction();
    });
  }

  handleBreakTime(current_time, break_time, context) {
    const breakDeadline = addMinutesToDate(current_time, break_time);
    this.breakInterval = setInterval(() => {
      const remainingBreakTime = getRemainingDate(breakDeadline);
      const { total, minutes, seconds } = remainingBreakTime;
      this.$timerEl.innerHTML = `${context}: ${minutes}:${seconds}`;
      if (total <= 0) {
        clearInterval(this.breakInterval);
        completeTaskOnApi(this.currentTask).then(() => {
          this.currentTask.completed = true;
          this.setActiveTask();
          this.$bodyEl.classList.add('taskActive');
        });
      }
    }, 1000);
  }

  initializeBreakTimer() {
    const now = getNow();
    this.taskCount += 1;
    if (this.taskCount % 4 === 0) {
      this.handleBreakTime(now, POMODORO_LONG_BREAK_TIME, 'Long Break');
      this.$breakAudio.play();
    } else {
      this.handleBreakTime(now, POMODORO_BREAK_TIME, 'Chill');
      this.$breakAudio.play();
    }
  }

  initializeTimer(deadline) {
    this.currentInterval = setInterval(() => {
      const remainingTime = getRemainingDate(deadline);
      const { total, minutes, seconds } = remainingTime;
      this.currentRemaining = total;
      this.$timerEl.innerHTML = `You are working: ${minutes}:${seconds}`;
      this.$bodyEl.classList.add('taskActive');
      if (total <= 0) {
        clearInterval(this.currentInterval);
        this.initializeBreakTimer();
        this.$bodyEl.classList.remove('taskActive');
        this.$bodyEl.classList.add('taskBreak');
      }
    }, 1000);
  }

  createNewTimer(deadline) {
    this.initializeTimer(deadline);
  }

  setActiveTask() {
    const $currentActiveEl = document.querySelector('tr.active');
    if ($currentActiveEl) {
      $currentActiveEl.classList.remove('active');
      $currentActiveEl.classList.add('completed');
    }
    this.currentTask = this.data.find((task) => !task.completed);
    console.log(this.data);
    if (this.currentTask) {
      const $currentTaskEl = document.querySelector(
        `tr[data-taskId = 'task${this.currentTask.id}']`
      );
      $currentTaskEl.classList.add('active');
      this.$startAudio.play();
      const newDeadline = addMinutesToDate(getNow(), POMODORO_WORK_TIME);
      this.createNewTimer(newDeadline);
    } else {
      clearInterval(this.currentInterval);
      clearInterval(this.breakInterval);
      this.$timerEl.innerHTML = 'All tasks are done';
    }
  }

  handleStart() {
    this.$startBtn.addEventListener('click', () => {
      if (this.currentRemaining) {
        const remainingDeadline = new Date(
          getNow().getTime() + this.currentRemaining
        );
        this.createNewTimer(remainingDeadline);
      } else {
        this.setActiveTask();
      }
    });
  }

  handlePause() {
    this.$pauseBtn.addEventListener('click', () => {
      clearInterval(this.currentInterval);
      console.log(this.currentRemaining);
    });
  }

  searchTask() {
    this.$searchInput.addEventListener('keyup', (event) => {
      const inputEl = event.target.value.toLowerCase();
      const rows = this.$tableTbody.querySelectorAll('tr');
      rows.forEach((item) => {
        item.querySelector('td').textContent.toLowerCase().startsWith(inputEl)
          ? (item.style.display = '')
          : (item.style.display = 'none');
      });
    });
  }

  init() {
    this.fillTasksTable();
    this.handleAddTask();
    this.handleStart();
    this.handlePause();
    this.searchTask();
  }
}

export default PomodoroApp;
