import methods from './methods.js';

const ul = document.querySelector('#list');
const clearChecked = document.querySelector('#clear');
const storage = window.localStorage;

const checkStatus = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    if (task.completed === true) {
      const List = document.querySelectorAll('input[type="checkbox"]');
      List.forEach((item) => {
               if(parseInt(item.id) + 1 === task.index){ //eslint-disable-line
          item.setAttribute('checked', '');
          item.parentNode.classList.add('checked');
        }
      });
    }
  });
};
// track changes on checkboxes
ul.onclick = (e) => {
  const tasksLs = JSON.parse(storage.getItem('tasks')) || [];
  e.target.onchange = () => {
    if (e.target.checked) {
      e.target.parentNode.classList.add('checked');
      tasksLs[e.target.parentNode.parentNode.id].completed = true;
      storage.setItem('tasks', JSON.stringify(tasksLs));
    } else {
      e.target.parentNode.classList.remove('checked');
      tasksLs[e.target.parentNode.parentNode.id].completed = false;
      storage.setItem('tasks', JSON.stringify(tasksLs));
    }
  };
};

// clear checked tasks from LS and html
clearChecked.onclick = () => {
  const tasksLS = JSON.parse(storage.getItem('tasks'));
  const remains = tasksLS.filter((task) => task.completed === false);
  let index = 0;
  remains.forEach((task) => {
    index += 1;
    task.index = index;
  });
  storage.setItem('tasks', JSON.stringify(remains));
  methods.displayTasks();
};

export default checkStatus;