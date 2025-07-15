let todoList = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [];

displayTodos();

function addTodo() {
    let taskInput = document.querySelector('.task-input')
    let taskDate = document.querySelector('.task-date');
    let task = taskInput.value.trim();
    let date = taskDate.value;
    if (task === null || date === null || task === undefined || date === undefined || task === '' || date === '') {
        alert('Please enter both task and date.');
        return;
    }
    if (task.length > 255) {
        alert('Task title is too long. Please limit it to 255 characters.');
        return;
    }
    let todo = {
        taskTitle: task,
        taskDate: date,
    }
    todoList.push(todo);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    taskInput.value = '';
    taskDate.value = '';
    displayTodos()
}

function displayTodos() {
    let todoContainer = document.querySelector('.task-list');
    todoContainer.innerHTML = '';
    let storedTodo = JSON.parse(localStorage.getItem('todoList')) || [];
    storedTodo.forEach((task, index) => {
        let newDate = new Date(task.taskDate);
        let formatedDate = newDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            year: 'numeric',
            month: 'long',
        });
        todoContainer.innerHTML += `
            <div class="task-item">
            <div class="task-info">
                <div class="task-title">${task.taskTitle}</div>
                <div class="task-date-display"><i class="fas fa-calendar-alt"></i> ${formatedDate}</div>
            </div>
            <div class="task-actions">
                <button class="btn edit" onclick="showEditForm(${index})"><i class="fas fa-pen"></i></button>
                <button class="btn delete" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
            `
    });
}

function deleteTask(index) {
    if (confirm('Are You Sure To Delete This Task?')) {
        todoList.splice(index, 1);
        localStorage.setItem('todoList', JSON.stringify(todoList));
        displayTodos();
    }
}

function showEditForm(index) {
    let storedTodo = JSON.parse(localStorage.getItem('todoList')) || [];
    let currentTodo = storedTodo[index];
    let taskTitleInput = document.querySelector('#taskTitleEdit')
    let taskDateInput = document.querySelector('#taskDateEdit');
    let taskIndex = document.querySelector('#taskIndex');
    taskTitleInput.value = currentTodo.taskTitle;
    taskDateInput.value = currentTodo.taskDate;
    taskIndex.value = index;
    openModal();
}

function updateTodo() {
    let taskTitleInput = document.querySelector('#taskTitleEdit')
    let taskDateInput = document.querySelector('#taskDateEdit');
    let taskIndex = document.querySelector('#taskIndex');
    let index = Number(taskIndex.value);
    if (taskTitleInput.value === null || taskDateInput.value === null || taskTitleInput.value === undefined || taskDateInput.value === undefined || taskTitleInput.value === '' || taskDateInput.value === '') {
        alert('Please enter both task and date.');
        return;
    }
    if (taskTitleInput.value.length > 255) {
        alert('Task title is too long. Please limit it to 255 characters.');
        return;
    }
    let storedTodo = JSON.parse(localStorage.getItem('todoList')) || [];
    storedTodo[index].taskTitle = taskTitleInput.value.trim();
    storedTodo[index].taskDate = taskDateInput.value;
    localStorage.setItem('todoList', JSON.stringify(storedTodo));
    closeModal();
    displayTodos();
}




function openModal() {
    document.getElementById('editModal').style.display = 'flex';
}
function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}
