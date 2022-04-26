import { transform } from 'lodash';
import './style.css';
const ul = document.querySelector('#list');
const add = document.querySelector('#add');
const addIcon = document.querySelector('#add-icon');
const tasks = [
    {
        description: "wash the dishes",
        completed : false,
    },
        {
        description: "complete To Do list project",
        completed : false,
    },
];
const displayTasks = () => {
    tasks.forEach((task, index) => {
        task.index = index;
        ul.innerHTML += `<li class="list-item" id="${index}">
        <div class="list-item-div">
        <input type="checkbox">${task.description}
        </div>
        <i class="fa-solid fa-ellipsis-vertical"></i></li>`;
        });
}
const addTask = (last) => {
    let lastIndex = tasks.length -1;
    last = tasks[lastIndex];
     ul.innerHTML += `<li class="list-item" id="${lastIndex}">
        <div class="list-item-div">
        <input type="checkbox">${last.description}
        </div>
        <i class="fa-solid fa-ellipsis-vertical"></i></li>`;
}

addIcon.onclick = () => {
    let value = add.value;
    tasks.push({description: value, completed: false});
    addTask();
    add.value = '';
}

document.onclick = (e) => {
    if(e.target.type === "checkbox") {
        if(e.target.checked) {
            e.target.parentNode.style.textDecoration = 'line-through';
            tasks[e.target.parentNode.parentNode.id].completed = true;
        } else {
            e.target.parentNode.style.textDecoration = 'none';
            tasks[e.target.parentNode.parentNode.id].completed = false;
        }
    }
}
window.onload = displayTasks();