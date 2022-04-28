const ul = document.querySelector('#list');
const add = document.querySelector('#add');
const addIcon = document.querySelector('#add-icon');
const clearChecked = document.querySelector('#clear');
const storage = window.localStorage;

const methods = {
  // remove item from the list
  removeItem: (item) => {
    const editedTasks = JSON.parse(storage.getItem('tasks'));
    const itemIndx = parseInt(item.id); //eslint-disable-line
    item.remove();
    editedTasks.splice(itemIndx, 1);
    editedTasks.forEach((task, index) => {
        task.index = ++index; // eslint-disable-line
    });
    storage.setItem('tasks', JSON.stringify(editedTasks));
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
        const tasks = JSON.parse(storage.getItem('tasks'));
        item.parentNode.parentNode.lastChild.className = 'fa-solid fa-ellipsis-vertical';
        item.parentNode.parentNode.classList.remove('active');
        tasks.forEach((task) => {
          if (parseInt(item.parentNode.parentNode.id) + 1 === task.index) { //eslint-disable-line
            task.description = item.value;
          }
        });
        storage.setItem('tasks', JSON.stringify(tasks));
      });
    });
  },
  // Add new task
  addTask: (index) => {
    const taskList = JSON.parse(storage.getItem('tasks')) || [];
    const task = taskList[index - 1];
    task.index = index;
    storage.setItem('tasks', JSON.stringify(taskList));
    ul.innerHTML += `<li class="list-item" id="${index - 1}">
                <div class="list-item-div">
                <input id="${index - 1}" type="checkbox"><input type="text" class="list-inp" value="${task.description}">
                </div>
                <i class="fa-solid fa-ellipsis-vertical"></i></li>`;
    methods.changeTask();
  },

  // display the tasks in the array
  displayTasks: () => {
    const taskArr = JSON.parse(storage.getItem('tasks')) || [];
    let index = 0;
    ul.innerHTML = '';
    taskArr.forEach((task) => {
      task.index = ++index; //eslint-disable-line
      ul.innerHTML += `<li class="list-item" id="${task.index - 1}">
                <div class="list-item-div">
                <input id="${task.index - 1}" type="checkbox"><input type="text" class="list-inp" value="${task.description}">
                </div>
                <i class="fa-solid fa-ellipsis-vertical"></i></li>`;
    });
    storage.setItem('tasks', JSON.stringify(taskArr));
    methods.changeTask();
  },
};

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
  const tasksLS = JSON.parse(storage.getItem('tasks'));
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
  const tasksLS = JSON.parse(storage.getItem('tasks'));
  const remains = tasksLS.filter((task) => task.completed === false);
  remains.forEach((task, index) => {
    task.index = ++index; // eslint-disable-line
  });
  storage.setItem('tasks', JSON.stringify(remains));
  methods.displayTasks();
};

export default methods;