// Show and Add Buttons
const showCatBtn = document.getElementById('showCatBtn');
const addCatBtn = document.getElementById('addCatBtn');
const showTaskBtn = document.getElementById('showTaskBtn');
const addTaskBtn = document.getElementById('addTaskBtn');
const catAddInput = document.getElementById('catAddInput');
const addTaskInput = document.getElementById('addTaskInput');
const selectCat = document.getElementById('selectCat');
const taskList = document.getElementById('task-list');
const categoriesBox = document.getElementById('categories-box');
const searchBoxinput = document.getElementById('searchBox');

// All Inputs for values
let categoryInput = document.getElementById('addCatinput');
let taskInput = document.getElementById('taskinput');

// Initial rendering;
catDataBase.forEach(renderCategory);
taskDataBase.forEach(renderTask);

// Functions
function onShowCategory() {
  catAddInput.classList.toggle('addcatInputHide');
  showCatBtn.classList.toggle('fa-square-xmark');
}

function onCategoryAdd() {
  const cName = categoryInput.value;
  if (cName === '') {
    alert('Add Something');
  } else if (doCatgoryExist(cName)) {
    alert('Task is already added.');
  } else {
    const cObject = addCategory(cName);
    console.log(cObject);
    renderCategory(cObject);
    categoryInput.value = '';
  }
}

function renderCategory(categoryObject) {
  let boxCat = document.createElement('div');
  boxCat.id = 'boxCategory';
  boxCat.classList.add('box-cat');
  // boxCat.classList.add('box-cat', 'swiper-slide');
  let p = document.createElement('p');
  p.id = categoryObject.id;
  let h2 = document.createElement('h2');
  h2.id = categoryObject.id;
  h2.innerText = categoryObject.name;
  if (categoriesBox.firstChild) {
    categoriesBox.insertBefore(boxCat, categoriesBox.firstChild);
  } else {
    categoriesBox.appendChild(boxCat);
  }
  boxCat.appendChild(p);
  boxCat.appendChild(h2);
  let size = taskDataBase.filter((t) => t.categoryId === categoryObject.id).length;
  p.innerText = `${size} Tasks`;
  let option = document.createElement('option');
  option.value = categoryObject.id;
  selectCat.appendChild(option);
  option.innerText = categoryObject.name;
  let isSelected = false;
  boxCat.onclick = (event) => {
    filterByCategory(categoryObject.id);
  };
}

function onShowTask() {
  if (catDataBase <= 0) {
    alert('Please add at least one Category');
  } else {
    addTaskInput.classList.toggle('addTaskInputHide');
    showTaskBtn.classList.toggle('fa-square-xmark');
  }
}

function onTaskAdd() {
  const taskName = taskInput.value;
  const categoryIdvalue = selectCat.value;
  const categoryId = Number(categoryIdvalue);
  if (taskName === '') {
    alert('Add Something');
  } else if (doTaskExist(taskName)) {
    alert('Task is already added.');
  } else {
    const taskObject = addTask(taskName, categoryId);
    renderTask(taskObject);
    categoriesBox.innerHTML = '';
    selectCat.innerHTML = '';
    catDataBase.forEach(renderCategory);
    taskInput.value = '';
  }
}

function renderTask(taskData) {
  let updateDeleteBtnDiv = document.createElement('div');
  let taskTextData = document.createElement('p');
  let completeTask = document.createElement('i');
  let updateTask = document.createElement('i');
  let deleteTask = document.createElement('i');
  let taskItem = document.createElement('li');

  let confirmeditTaskicon = document.createElement('li');
  confirmeditTaskicon.id = 'confirmEditTask';
  confirmeditTaskicon.classList.add('fa-solid');
  confirmeditTaskicon.classList.add('fa-square-check');
  let canceleditTaskicon = document.createElement('li');
  canceleditTaskicon.id = 'cancelEditTask';
  canceleditTaskicon.classList.add('fa-solid');
  canceleditTaskicon.classList.add('fa-rectangle-xmark');

  taskItem.id = taskData.id;
  taskItem.classList.add('task-items');

  completeTask.id = 'complete-task';
  completeTask.classList.add('fa-circle-check');

  taskTextData.id = 'tasktextId';
  taskTextData.classList.add('taskTextData');
  taskTextData.innerText = taskData.text;

  updateDeleteBtnDiv.classList.add('update-delete-btn');

  updateTask.id = 'updateTask';
  updateTask.classList.add('fa-solid');
  updateTask.classList.add('fa-square-pen');

  deleteTask.id = 'delete-task';
  deleteTask.classList.add('fa-solid');
  deleteTask.classList.add('fa-trash');

  if (taskData.isCompleted) {
    updateTask.style.display = 'None';
    completeTask.classList.add('fa-solid');
    taskTextData.style.textDecoration = 'line-through';
  } else {
    completeTask.classList.add('fa-regular');
  }
  completeTask.onclick = (event) => {
    taskData.isCompleted = !taskData.isCompleted;
    editTask(taskData);

    if (taskData.isCompleted) {
      updateTask.style.display = 'None';
      completeTask.classList.remove('fa-regular');
      completeTask.classList.add('fa-solid');
      taskTextData.style.textDecoration = 'line-through';
    } else {
      updateTask.style.display = '';
      completeTask.classList.remove('fa-solid');
      completeTask.classList.add('fa-regular');
      taskTextData.style.textDecoration = 'none';
    }
  };

  deleteTask.onclick = (event) => {
    remove(taskData.id);
    taskItem.remove();
    categoriesBox.innerHTML = '';
    selectCat.innerHTML = '';
    catDataBase.forEach(renderCategory);
  };

  updateTask.onclick = () => {
    taskTextData.innerText = '';
    let taskInputEdit = document.createElement('input');
    taskTextData.appendChild(taskInputEdit);
    let prevTaskVlaue = taskData.text;
    taskInputEdit.value = prevTaskVlaue;
    updateTask.remove();
    deleteTask.remove();
    updateDeleteBtnDiv.appendChild(confirmeditTaskicon);
    updateDeleteBtnDiv.appendChild(canceleditTaskicon);

    confirmEditTask.onclick = () => {
      let newData = taskInputEdit.value;
      taskData.text = newData;
      editTask(taskData);
      confirmeditTaskicon.remove();
      canceleditTaskicon.remove();
      updateDeleteBtnDiv.appendChild(updateTask);
      updateDeleteBtnDiv.appendChild(deleteTask);
      taskInputEdit.remove();
      newData = taskTextData.innerText;
      taskTextData.innerText = taskData.text;
    };
    cancelEditTask.onclick = () => {
      confirmeditTaskicon.remove();
      canceleditTaskicon.remove();
      updateDeleteBtnDiv.appendChild(updateTask);
      updateDeleteBtnDiv.appendChild(deleteTask);
      taskTextData.innerText = taskData.text;
    };

    // taskData.text = prompt("Enter edited value");
    // editTask(taskData);
    // taskTextData.innerText = taskData.text;
  };

  // taskList.appendChild(taskItem);
  if (taskList.firstChild) {
    taskList.insertBefore(taskItem, taskList.firstChild);
  } else {
    taskList.appendChild(taskItem);
  }
  taskItem.appendChild(completeTask);
  taskItem.appendChild(taskTextData);
  taskItem.appendChild(updateDeleteBtnDiv);
  updateDeleteBtnDiv.appendChild(updateTask);
  updateDeleteBtnDiv.appendChild(deleteTask);
}

function searchBox() {
  const searchValue = searchBoxinput.value.toLowerCase();
  const filteredTasks = taskDataBase.filter((task) => {
    const taskText = task.text.toLowerCase();
    return taskText.includes(searchValue);
  });
  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<h3>Sorry Record in not Found Please Search again</h3>`;
  } else {
    console.log(filteredTasks);
    taskList.innerHTML = '';
    filteredTasks.forEach(renderTask);
  }
}

function filterByCategory(cid) {
  const filteredTasks = taskDataBase.filter((task) => task.categoryId === cid);
  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<h3>Sorry Record in not Found Please Search again</h3>`;
  } else {
    console.log(filteredTasks);
    taskList.innerHTML = '';
    filteredTasks.forEach(renderTask);
  }
}

searchBoxinput.onkeyup = searchBox;
addTaskBtn.onclick = onTaskAdd;
showTaskBtn.onclick = onShowTask;
showCatBtn.onclick = onShowCategory;
addCatBtn.onclick = onCategoryAdd;
