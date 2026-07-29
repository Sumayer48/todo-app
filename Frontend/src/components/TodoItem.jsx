function TodoItem({
  todo,
  startEditing,
  deleteTodo,
}) {

  return (
    <li>
        {todo.todo}

        <button onClick={() => startEditing(todo)}>
            Edit
        </button>

        <button onClick={() => deleteTodo(todo._id)}>
            Delete
        </button>
        
        </li>
    );
}

export default TodoItem;