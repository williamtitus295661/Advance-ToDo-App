let catDataBase = JSON.parse(localStorage.getItem('Categories')) || [];
let taskDataBase = JSON.parse(localStorage.getItem('Tasks')) || [];
let catIdCounter = catDataBase.length + 1;
let taskIdCounter = taskDataBase.length + 1;

function updateTaskDatabase(newValue) {
  localStorage.setItem('Tasks', JSON.stringify(newValue));
}

function updateCatDatabase(newValue) {
  localStorage.setItem('Categories', JSON.stringify(newValue));
}
// Tasks

// Add
function addTask(taskText, categoryId) {
  let id = taskIdCounter;
  taskIdCounter = taskIdCounter + 1;
  const isCompleted = false;
  const taskObject = {id: id, text: taskText, categoryId: categoryId, isCompleted};
  taskDataBase.push(taskObject);
  updateTaskDatabase(taskDataBase);
  return taskObject;
}

// Remove
function remove(id) {
  taskDataBase = taskDataBase.filter((t) => Number(t.id) !== Number(id));
  updateTaskDatabase(taskDataBase);
  return id;
}

// Update
function editTask(data) {
  let task = taskDataBase.find((t) => Number(t.id) === Number(data.id));
  task = {...task, ...data};
  updateTaskDatabase(taskDataBase);
  return task;
}

// Create

// Categories
function addCategory(categoryName) {
  let id = catIdCounter;
  catIdCounter = catIdCounter + 1;
  const cObject = {id: id, name: categoryName};
  catDataBase.push(cObject);
  updateCatDatabase(catDataBase);
  return cObject;
}

// Add
function doCatgoryExist(categoryName) {
  return catDataBase.findIndex((ct) => ct.name.toLowerCase() === categoryName.toLowerCase()) > -1;
}

function doTaskExist(taskName) {
  return taskDataBase.findIndex((ct) => ct.text.toLowerCase() === taskName.toLowerCase()) > -1;
}

function emptyCatedb(checkempty) {
  return catDataBase < 0;
}
