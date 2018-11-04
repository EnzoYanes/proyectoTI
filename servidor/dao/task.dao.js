
const Task = require('../models/task');

const getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
};

const insertTask = async(req, res) => {
    const {title, description} = req.body;
    const task = new Task({title, description});
    await task.save();
    res.json({status: 'Task Saved'});
}

const getTask = async (req,res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
};

const updateTask = async(req, res) => {
    const { title, description } = req.body;
    const newTask = {title,description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task Updated'});
};

const deleteTask = async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Task Deleted'});
};

module.exports={
    getTasks,
    insertTask,
    getTask,
    updateTask,
    deleteTask
};