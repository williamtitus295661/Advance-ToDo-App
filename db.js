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

// Remove Category
function removeCategory(categoryId) {
  catDataBase = catDataBase.filter((c) => Number(c.id) !== Number(categoryId));
  updateCatDatabase(catDataBase);
  return categoryId;
}

document.addEventListener('DOMContentLoaded', () => {
    const deleteCategoryBtn = document.getElementById('deleteCategoryBtn');
    const deleteCatSelect = document.getElementById('deleteCatSelect');
    const confirmDeleteCatBtn = document.getElementById('confirmDeleteCatBtn');
    const categoriesBox = document.getElementById('categories-box');

    // Function to populate the delete category dropdown
    function populateDeleteCatSelect() {
        deleteCatSelect.innerHTML = ''; // Clear existing options
        console.log('Populating delete category dropdown...');
        console.log('Current categories:', catDataBase);
        catDataBase.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            deleteCatSelect.appendChild(option);
        });
        console.log('Dropdown options:', deleteCatSelect.innerHTML);
    }

    // Show the delete category dropdown when the delete button is clicked
    deleteCategoryBtn.addEventListener('click', () => {
        populateDeleteCatSelect();
        document.getElementById('deleteCategoryContainer').classList.toggle('show');
    });

    // Function to delete the selected category
    confirmDeleteCatBtn.addEventListener('click', () => {
        const selectedCategoryId = deleteCatSelect.value;
        removeCategory(selectedCategoryId);
        populateDeleteCatSelect(); // Update the dropdown after deletion
    });
});
