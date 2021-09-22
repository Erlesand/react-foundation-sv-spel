import { useState } from "react";

const style = {
  width: "100%",
  backgroundColor: "#FFF",
  padding: 16,
  fontSize: 24,
  fontStyle: "italic",
  fontWeight: 300,
  border: "none",
};

const TodoForm = ({ createTodo }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim()) {
      createTodo(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        style={style}
        placeholder="What do you need to do?"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />
    </form>
  );
};

export default TodoForm;
