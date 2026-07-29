const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        todo: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
    timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;