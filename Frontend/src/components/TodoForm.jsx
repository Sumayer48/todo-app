function TodoForm({
  newTodo,
  setNewTodo,
  addTodo,
  editingId,
  editText,
  setEditText,
  updateTodo,
}) {

  return (
    <>
      {editingId ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <button onClick={updateTodo}>
            Save
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={newTodo}
            placeholder="Enter a todo"
            onChange={(e) =>
              setNewTodo(e.target.value)
            }
          />

          <button onClick={addTodo}>
            Add Todo
          </button>
        </>
      )}
    </>
  );
}

export default TodoForm;