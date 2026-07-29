const Todo = require('../models/todoModel');

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();

        res.status(200).json({
            success: true,
            data: todos
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if(!todo){
                return res.status(404).json({
                message: 'Todo not found'
            });
        }

        res.status(200).json({
            success: true,
            data: todo
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

const createTodo = async (req, res) => {
    try {
        const todo = await Todo.create({todo: req.body.todo});

        res.status(201).json({
            success: true,
            data: todo,
            message: 'Todo added successfully'
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, {
                todo: req.body.todo,
                completed: req.body.completed
            },
            {
                new: true,
                runValidators: true
        });

        if(!todo){
                return res.status(404).json({
                message: 'Todo not found'
            });
        }

        res.status(200).json({
            success: true,
            data: todo,
            message: 'Todo updated successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if(!todo){
                return res.status(404).json({
                message: 'Todo not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Todo deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

module.exports = {
    getTodos, getTodo, createTodo, updateTodo, deleteTodo
};




