const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

const loadTasks = async () => {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;
        taskList.appendChild(li);
    });
};

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = document.getElementById('taskInput').value;
    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: task })
    });
    loadTasks();
    document.getElementById('taskInput').value = '';
});

loadTasks();
