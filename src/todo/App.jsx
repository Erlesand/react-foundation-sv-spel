import Todo from "./Todo";
import TodoForm from "./TodoForm";

const initialTodos = require("./todos.json");

export const App = () => {
  return (
    <>
      <div>
        <TodoForm />
        {initialTodos.map(({ userId, ...todo }) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </div>
    </>
  );
};
