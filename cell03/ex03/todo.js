document.addEventListener('DOMContentLoaded', loadTasks);

function openTaskPrompt() {
    const taskText = prompt('Enter a new task:');
    if (taskText !== null && taskText.trim() !== '') {
        addTask(taskText);
        saveTasks();
    }
}

function createTaskElement(text) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.textContent = text;
    taskDiv.addEventListener('click', function () {
        const confirmDelete = confirm('Do you want to remove this task?');
        if (confirmDelete) {
            taskDiv.remove();
            saveTasks();
        }
    });
    return taskDiv;
}

function addTask(text) {
    const ftList = document.getElementById('ft_list');
    const taskDiv = createTaskElement(text);
    ftList.insertBefore(taskDiv, ftList.firstChild);
}

function saveTasks() {
    const ftList = document.getElementById('ft_list');
    const tasks = ftList.querySelectorAll('.task');
    const tasksArray = Array.from(tasks).map(task => task.textContent);
    document.cookie = `tasks=${JSON.stringify(tasksArray)}`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

function loadTasks() {
    const ftList = document.getElementById('ft_list');
    const storedTasks = getCookie('tasks');
    if (storedTasks) {
        const tasksArray = JSON.parse(storedTasks);
        const reversedTasks = tasksArray.reverse();
        reversedTasks.forEach(task => {
            const taskDiv = createTaskElement(task);
            ftList.appendChild(taskDiv);
        });
    }
}
