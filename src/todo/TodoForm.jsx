const TodoForm = () => {
  const style = {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 16,
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: 300,
    border: "none",
  };

  return (
    <form>
      <input style={style} placeholder="What do you need to do?" />
    </form>
  );
};

export default TodoForm;
