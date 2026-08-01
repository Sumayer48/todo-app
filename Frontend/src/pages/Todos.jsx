import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function Todos() {
    const navigate = useNavigate();
    // JWT Token
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    // State
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get Todos
    const getTodos = () => {
        setLoading(true);
        setError("");

        fetch("https://todo-app-f1a2.onrender.com/api/v1/todos", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setTodos(data.data);
            setLoading(false);
        })
        .catch((error) => {
            setError("Failed to load todos.");
            setLoading(false);
        });
    };

    // Load Todos
    useEffect(() => {
        getTodos();
    }, []);


    // Add todo      
  const addTodo = () => {
    fetch("https://todo-app-f1a2.onrender.com/api/v1/todos", {
      method: "POST",
      headers,
      body: JSON.stringify({
        todo: newTodo,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
            
      setTodos([...todos, data.data]);

      setNewTodo("");
    })
    .catch((error) => {
      console.log(error);
    });
  };

  // Start Editing
  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.todo);
  };

  // Update Todo
  const updateTodo = () => {
    fetch(`https://todo-app-f1a2.onrender.com/api/v1/todos/${editingId}`, {
      method: "PUT",
      headers,
        body: JSON.stringify({
        todo: editText,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      
      setTodos(
        todos.map((todo) =>
          todo._id === editingId ? data.data : todo
      )
    );

      setEditingId(null);
      setEditText("");
    })
    .catch((error) => {
      console.log(error);
    });
  };


  // Delete todo      
  const deleteTodo = (id) => {
    fetch(`https://todo-app-f1a2.onrender.com/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.json())
    .then(() => { 
      setTodos(
        todos.filter((todo) => todo._id !== id)
        );
    })
    .catch((error) => {
      console.log(error);
    });
  };

  // Logout
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Loading
    if(loading) {
        return <h2>Loading...</h2>;
    }

    // Error
    if(error) {
        return <h2>{error}</h2>;
    }

  return (
    <>
      <h1>Todo List</h1>

       <button onClick={logout}>Logout</button>

      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        addTodo={addTodo}
        editingId={editingId}
        editText={editText}
        setEditText={setEditText}
        updateTodo={updateTodo}
      />

      <TodoList
        todos={todos}
        startEditing={startEditing}
        deleteTodo={deleteTodo}
      />
    </>
    );
}

export default Todos;