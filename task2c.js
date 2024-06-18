document.getElementById('start-button').addEventListener('click', function() {
    const welcomePage = document.getElementById('welcome-page');
    const todoPage = document.getElementById('todo-page');

    welcomePage.style.opacity = '0';
    welcomePage.style.transform = 'translateX(-100%)';
    setTimeout(() => {
        welcomePage.classList.add('hidden');
        todoPage.classList.remove('hidden');
        setTimeout(() => {
            todoPage.style.opacity = '1';
            todoPage.style.transform = 'translateX(0)';
        }, 100);
    }, 1000);
});

document.getElementById('add-task-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const priority = document.getElementById('priority');
    const dueDate = document.getElementById('due-date');
    const boxes = document.getElementById('boxes');

    const taskText = taskInput.value.trim();
    const taskPriority = priority.value;
    const taskDueDate = dueDate.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    let taskBox = boxes.querySelector('.task-box:last-child');
    if (!taskBox || taskBox.querySelectorAll('.task-item').length >= 5) {
        taskBox = document.createElement('div');
        taskBox.className = 'task-box';
        boxes.appendChild(taskBox);
    }

    const taskList = taskBox.querySelector('.task-list') || document.createElement('ul');
    if (!taskList.className) {
        taskList.className = 'task-list';
        taskBox.appendChild(taskList);
    }

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <span>
            <strong>${taskPriority.toUpperCase()}:</strong> ${taskText} - <em>${taskDueDate}</em>
        </span>
        <div>
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    taskList.appendChild(taskItem);

    taskInput.value = '';
    priority.value = 'low';
    dueDate.value = '';

    taskItem.querySelector('.complete-btn').addEventListener('click', function() {
        taskItem.classList.toggle('completed');
    });

    taskItem.querySelector('.delete-btn').addEventListener('click', function() {
        taskList.removeChild(taskItem);
        if (taskList.children.length === 0) {
            boxes.removeChild(taskBox);
        }
    });
});
