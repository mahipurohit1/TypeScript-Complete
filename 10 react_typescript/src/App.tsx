import React, { useState } from "react";
import NewTodo from "./Components/NewTodo";
import TodoList from "./Components/TodoList";

const App: React.FC = () => {
  const [todo, setTodo] = useState<{ id: string; text: string }[]>([]);
  const addData = (data: { id: string; text: string }) => {
    setTodo((prevState) => [...prevState, data]);
  };

  const deleteData = (id: string) => {
    const selectedTodo = todo.filter((t) => {
      return t.id !== id;
    });
    setTodo(selectedTodo);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Todo-List</h1>
      <NewTodo onAddData={addData} />
      <TodoList items={todo} onDeleteData={deleteData} />
    </div>
  );
};

export default App;
