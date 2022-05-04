import './style.css';
import methods from '../modules/methods.js';
import checkStatus from '../modules/status.js';

const add = document.querySelector('#add');
const addIcon = document.querySelector('#add-icon');
const storage = window.localStorage;

// add new task
const addItem = () => {
  if (add.value.length > 0) {
    const addedTask = JSON.parse(storage.getItem('tasks')) || [];
    const { value } = add;
    addedTask.push({ description: value, completed: false });
    storage.setItem('tasks', JSON.stringify(addedTask));
    const last = addedTask.length;
    add.value = '';
    methods.addTask(last);
  }
};
addIcon.onclick = addItem;
add.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addItem();
  }
});

window.onload = methods.displayTasks();
window.onload = checkStatus();