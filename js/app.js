const boton = document.getElementById('btn-send');
// const taskContainer = document.querySelector('.tasks');
const taskContainer = document.getElementById('task-list');

taskContainer.addEventListener('click', deleteTask);
taskContainer.addEventListener('touchstart', deleteTask);
document.addEventListener('DOMContentLoaded', checkingLocalStorage);
boton.addEventListener('click', (e) => {
    e.preventDefault();
    const field = document.getElementById('todo');
    //Check if the user inputs a value
    if(field.value !== ''){
        const newTask = field.value;
        
        //Create delete icon
        const deleteIcon = document.createElement('i');
        deleteIcon.classList = 'fas fa-trash-alt delete-task';
        
        
        //Add task to DOM
        const li = document.createElement('li');
        li.className = 'task';
        li.innerText = newTask;
        li.appendChild(deleteIcon);
        taskContainer.appendChild(li);
        taskContainer.style.display = 'block';
        addTaskToLocalStorage(newTask);
    } else {
        alert('Please, add some tasks!');
    }  
    document.getElementById('form').reset();
})

//Add tasks to LocalStorage
function addTaskToLocalStorage(newTask){
    let tasks;
    
    //Check if Local Storage have some tasks
    tasks = getLocalStorageTasks();
    
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Delete task from DOM
function deleteTask(e){
    if(e.target.className === 'fas fa-trash-alt delete-task'){
        deleteTaskLocalStorage(e.target.parentElement.innerText);
        e.target.parentElement.remove();
        if(taskContainer.firstElementChild === null){
            taskContainer.style.display = 'none';
        }
    }
}


//Checking if Local Storage have tasks
function getLocalStorageTasks(){
    let tasks;
    //Checking Local Storage values
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function deleteTaskLocalStorage(task){
    let tasks, taskToDelete;
    
    taskToDelete = task;
    tasks = getLocalStorageTasks();
    
    tasks.forEach(function(task, index){
        if(taskToDelete === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function checkingLocalStorage(){
    let tasks;
    //Check if Local Storage have a value
    tasks = getLocalStorageTasks();
    tasks.forEach(function(task, index) {
        const li = document.createElement('li');
        const deleteIcon = document.createElement('i');
        deleteIcon.classList = 'fas fa-trash-alt delete-task';
        li.className = 'task';
        li.innerText = task;
        li.appendChild(deleteIcon);
        taskContainer.appendChild(li);
    })
    if(tasks.length !== 0){
        taskContainer.style.display = 'block';
    }
}