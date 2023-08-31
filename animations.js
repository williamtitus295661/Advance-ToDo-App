// Add Category Animations 
categoryInput.addEventListener('focusin', (event)=>{
    addCatBtn.classList.replace("fa-circle-up", "fa-circle-down");
});
categoryInput.addEventListener('focusout', (event)=>{
    addCatBtn.classList.replace("fa-circle-down", "fa-circle-up");
})


// Add Task Animations 
taskInput.addEventListener('focusin', (event)=>{
    addTaskBtn.classList.replace("fa-circle-up", "fa-circle-down");
});
taskInput.addEventListener('focusout', (event)=>{
    addTaskBtn.classList.replace("fa-circle-down", "fa-circle-up");
})

