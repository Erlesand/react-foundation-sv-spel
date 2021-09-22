import { useEffect, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const initialTodos = require("./todos.json");

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    const incomplete = todos.reduce(
      (count, todo) => count + !todo.completed,
      0
    );

    document.title = `Todos (${todos ? incomplete : "-"})`;
  }, [todos]);

  const createTodo = (title) => {
    setTodos([
      {
        id: Date.now(),
        completed: false,
        title,
      },
      ...todos,
    ]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }

        return todo;
      })
    );
  };

  return (
    <>
      <div>
        <TodoForm createTodo={createTodo} />
        {todos.map(({ userId, ...todo }) => (
          <Todo
            key={todo.id}
            {...todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
    </>
  );
};
