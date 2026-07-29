import TodoItem from "./TodoItem";

function TodoList({
  todos,
  startEditing,
  deleteTodo,
}) {

  return (
    <ul>

        {todos.map((todo) =>(

            <TodoItem
                key={todo._id}
                todo={todo}
                startEditing={startEditing}
                deleteTodo={deleteTodo}
            />
        ))}
    </ul>
  );
}

export default TodoList;