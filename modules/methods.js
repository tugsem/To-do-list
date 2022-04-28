const ul = document.querySelector('#list');
const add = document.querySelector('#add');
const addIcon = document.querySelector('#add-icon');
const clearChecked = document.querySelector('#clear');
const storage = window.localStorage;
let tasksLS = JSON.parse(storage.getItem('tasks')) || [];

const methods = {
  removeItem: (item) => {
    const itemIndx = parseInt(item.id); //eslint-disable-line
    item.remove();
    tasksLS.splice(itemIndx, 1);
    tasksLS.forEach((task, index) => {
        task.index = ++index; // eslint-disable-line
    });
    storage.setItem('tasks', JSON.stringify(tasksLS));
  },
  // display trash button on click
  changeTask: () => {
    const list = document.querySelectorAll('.list-inp');
    list.forEach((item) => {
      item.addEventListener('focus', () => {
        if (item.parentNode.parentNode.lastChild.className === 'fa-solid fa-ellipsis-vertical') {
          item.parentNode.parentNode.lastChild.className = 'fa-solid fa-trash-can';
          item.parentNode.parentNode.classList.toggle('active');
          document.onclick = (e) => {
            if (e.target.lastChild.className === 'fa-solid fa-ellipsis-vertical') {
              const removed = e.target;
              methods.removeItem(removed);
            }
          };
        }
      });
      item.addEventListener('blur', () => {
        item.parentNode.parentNode.lastChild.className = 'fa-solid fa-ellipsis-vertical';
        item.parentNode.parentNode.classList.remove('active');
        tasksLS.forEach((task) => {
          if (parseInt(item.parentNode.parentNode.id) + 1 === task.index) { //eslint-disable-line
            task.description = item.value;
          }
        });
        storage.setItem('tasks', JSON.stringify(tasksLS));
      });
    });
  },
  // Add new task
  addTask: (index) => {
    const task = tasksLS[index - 1];
    task.index = index;
    storage.setItem('tasks', JSON.stringify(tasksLS));
    ul.innerHTML += `<li class="list-item" id="${index - 1}">
                <div class="list-item-div">
                <input id="${index - 1}" type="checkbox"><input type="text" class="list-inp" value="${task.description}">
                </div>
                <i class="fa-solid fa-ellipsis-vertical"></i></li>`;
    methods.changeTask();
  },

  // display the tasks in the array
  displayTasks: () => {
    const taskList = JSON.parse(storage.getItem('tasks')) || [];
    let index = 0;
    ul.innerHTML = '';
    taskList.forEach((task) => {
      task.index = ++index; //eslint-disable-line
      ul.innerHTML += `<li class="list-item" id="${task.index - 1}">
                <div class="list-item-div">
                <input id="${task.index - 1}" type="checkbox"><input type="text" class="list-inp" value="${task.description}">
                </div>
                <i class="fa-solid fa-ellipsis-vertical"></i></li>`;
    });
    methods.changeTask();
  },
};

// add new task
addIcon.onclick = () => {
  const { value } = add;
  tasksLS.push({ description: value, completed: false });
  const last = tasksLS.length;
  add.value = '';
  methods.addTask(last);
};

// track changes on checkboxes
ul.onclick = (e) => {
  tasksLS = JSON.parse(storage.getItem('tasks')) || [];
  if (e.target.type === 'checkbox') {
    if (e.target.checked) {
      e.target.parentNode.style.textDecoration = 'line-through';
      tasksLS[e.target.parentNode.parentNode.id].completed = true;
    } else {
      e.target.parentNode.style.textDecoration = 'none';
      tasksLS[e.target.parentNode.parentNode.id].completed = false;
    }
  }
  storage.setItem('tasks', JSON.stringify(tasksLS));
};
// clear checked tasks from LS and html
clearChecked.onclick = () => {
  tasksLS = JSON.parse(storage.getItem('tasks')) || [];
  const remains = tasksLS.filter((task) => task.completed === false);
  remains.forEach((task, index) => {
    task.index = ++index; // eslint-disable-line
  });
  storage.setItem('tasks', JSON.stringify(remains));
  methods.displayTasks();
};

window.onload = methods.displayTasks();

export default methods;