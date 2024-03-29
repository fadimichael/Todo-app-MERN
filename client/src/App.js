import { useEffect, useState } from "react";
const api_base = process.env.REACT_APP_API_BASE || "http://localhost:4949";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);
  console.log(todos);
  const GetTodos = () => {
    fetch(process.env.REACT_APP_API_BASE + "/todos/all")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (unique_id) => {
    const data = await fetch(api_base + "/todos/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: unique_id }),
    }).then((res) => res.json());

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
  };

  const addTodo = async () => {
    const data = await fetch(api_base + "/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTodo }),
    }).then((res) => res.json());

    setTodos([data, ...todos]);

    setPopupActive(false);
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    fetch(api_base + "/todos/delete", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unique_id: id }),
    })
      .then((res) => res.json())
      .then((newtodosArray) => {
        setTodos(newtodosArray);
      });
  };

  return (
    <div className="App">
      <h1>Welcome, Fadi</h1>
      <h4>Your tasks</h4>

      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div className="wrapper" key={todo._id}>
              <div
                className={"todo" + (todo.complete ? " is-complete" : "")}
                // key={todo._id}
                onClick={() => completeTodo(todo._id)}>
                <div className="checkbox"></div>

                <div className="text">{todo.text}</div>
              </div>
              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
                x
              </div>
            </div>
          ))
        ) : (
          <p>You currently have no tasks</p>
        )}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? addTodo(e.target.value) : ""
              }
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
