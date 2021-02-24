import { getDataFromApi, addTaskToApi, deleteTaskToApi } from './data';

class PomodoroApp {
  constructor(options) {
    let { tableTbodySelector, taskFormSelector } = options;
    this.$tableTbody = document.querySelector(tableTbodySelector);
    this.$taskForm = document.querySelector(taskFormSelector);
    this.$taskFormInput = this.$taskForm.querySelector('input');
    this.$taskFormBtn = this.$taskForm.querySelector('button');
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

  /*
  deleteRow() {
    const $deleteButtonEl = document.querySelectorAll('.delete-btn');
    $deleteButtonEl.forEach((element) => {
      element.addEventListener('click', () => {
        const { id } = element;
        this.deleteTask(id);
      });
    });
  }

  deleteTask(id) {
    deleteTaskToApi(id)
      .then((response) => response.json())
      .then((data) => {
        const row = document.getElementById(`${data.id}`);
        row.remove();
      });
  }
*/
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
    this.$tableTbody.appendChild($newTaskEl);
    this.$taskFormInput.value = '';
  }

  handleAddTask() {
    this.$taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const task = { title: this.$taskFormInput.value };
      this.addTask(task);
    });
  }

  fillTasksTable() {
    getDataFromApi().then((currentTasks) => {
      currentTasks.forEach((task, index) => {
        this.addTaskToTable(task, index + 1);
      });
      this.deleteBtnAction();
    });
    //this.deleteRow();
  }

  init() {
    this.fillTasksTable();
    this.handleAddTask();
  }
}

export default PomodoroApp;
