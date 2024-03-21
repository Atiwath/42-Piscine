$(document).ready(function () {
    loadTasks();

    $('#newButton').click(function () {
        const taskText = prompt('Enter a new task:');
        if (taskText !== null && taskText.trim() !== '') {
            addTask(taskText);
            saveTasks();
        }
    });

    function createTaskElement(text) {
        const taskDiv = $('<div>').addClass('task').text(text);
        taskDiv.click(function () {
            const confirmDelete = confirm('Do you want to remove this task?');
            if (confirmDelete) {
                taskDiv.remove();
                saveTasks();
            }
        });
        return taskDiv;
    }

    function addTask(text) {
        const ftList = $('#ft_list');
        const taskDiv = createTaskElement(text);
        ftList.prepend(taskDiv);
    }

    function saveTasks() {
        const ftList = $('#ft_list');
        const tasksArray = ftList.find('.task').map(function () {
            return $(this).text();
        }).get();
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
        const ftList = $('#ft_list');
        const storedTasks = getCookie('tasks');
        if (storedTasks) {
            const tasksArray = JSON.parse(storedTasks).reverse();
            $.each(tasksArray, function (_, task) {
                const taskDiv = createTaskElement(task);
                ftList.append(taskDiv);
            });
        }
    }
});
