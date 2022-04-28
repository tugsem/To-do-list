import './style.css';
import methods from '../modules/methods.js';

const ul = document.querySelector('#list');
const add = document.querySelector('#add');
const addIcon = document.querySelector('#add-icon');
const clearChecked = document.querySelector('#clear');
const storage = window.localStorage;

// add new task
addIcon.onclick = () => {
  const addedTask = JSON.parse(storage.getItem('tasks')) || [];
  const { value } = add;
  addedTask.push({ description: value, completed: false });
  storage.setItem('tasks', JSON.stringify(addedTask));
  const last = addedTask.length;
  add.value = '';
  methods.addTask(last);
};

// track changes on checkboxes
ul.onclick = (e) => {
  const tasksLs = JSON.parse(storage.getItem('tasks'));
  if (e.target.type === 'checkbox') {
    if (e.target.checked === true) {
      e.target.parentNode.style.textDecoration = 'line-through';
      tasksLs[e.target.parentNode.parentNode.id].completed = true;
    } else {
      e.target.parentNode.style.textDecoration = 'none';
      tasksLs[e.target.parentNode.parentNode.id].completed = false;
    }
  }
  storage.setItem('tasks', JSON.stringify(tasksLs));
};
// clear checked tasks from LS and html
clearChecked.onclick = () => {
  const tasksLS = JSON.parse(storage.getItem('tasks'));
  const remains = tasksLS.filter((task) => task.completed === false);
  remains.forEach((task, index) => {
    task.index = ++index; // eslint-disable-line
  });
  storage.setItem('tasks', JSON.stringify(remains));
  methods.displayTasks();
};

window.onload = methods.displayTasks();