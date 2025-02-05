document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => addTaskToDOM(task, index));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const taskText = taskInput.value;
    const priority = priorityInput.value;

    if (taskText === '') return;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = { text: taskText, priority: priority };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    addTaskToDOM(task, tasks.length - 1);

    taskInput.value = '';
}

function addTaskToDOM(task, index) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = 'task';
    li.innerHTML = `<span>${index + 1}. ${task.text} : ${task.priority}</span>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>`;
    taskList.appendChild(li);
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const newTaskText = prompt('Edit task:', tasks[index].text);
    const newPriority = prompt('Edit priority (Low, Medium, High):', tasks[index].priority);

    if (newTaskText !== null && newPriority !== null) {
        tasks[index].text = newTaskText;
        tasks[index].priority = newPriority;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        refreshTaskList();
    }
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskList();
}

function refreshTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    loadTasks();
}