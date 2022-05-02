const ul = document.querySelector('#list');
const storage = window.localStorage;

const methods = {
  // remove item from the list
  removeItem: (item) => {
    const editedTasks = JSON.parse(storage.getItem('tasks'));
    const itemIndx = parseInt(item.id); //eslint-disable-line
    item.remove();
    editedTasks.splice(itemIndx, 1);
    editedTasks.forEach((task, index) => {
      task.index += index;
    });
    storage.setItem('tasks', JSON.stringify(editedTasks));
    methods.displayTasks();
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
                <input id="${index - 1}" class="cbx" type="checkbox"><input type="text" class="list-inp" value="${task.description}">
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
      index += 1;
      task.index = index;
      ul.innerHTML += `<li class="list-item" id="${task.index - 1}">
                <div class="list-item-div">
                <input id="${task.index - 1}" class="cbx" type="checkbox"><input type="text" class="list-inp" value="${task.description}">
                </div>
                <i class="fa-solid fa-ellipsis-vertical"></i></li>`;
    });
    storage.setItem('tasks', JSON.stringify(taskArr));
    methods.changeTask();
  },
};

export default methods;