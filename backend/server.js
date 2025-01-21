const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const getTasks = () => {
    try {
        const data = fs.readFileSync('backend/tasks.json', 'utf8');
        return JSON.parse(data || '[]');
    } catch {
        return [];
    }
};

app.get('/tasks', (req, res) => {
    res.json(getTasks());
});

app.post('/tasks', (req, res) => {
    const tasks = getTasks();
    tasks.push(req.body);
    fs.writeFileSync('backend/tasks.json', JSON.stringify(tasks, null, 2));
    res.status(201).json({ message: 'Task added successfully' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
