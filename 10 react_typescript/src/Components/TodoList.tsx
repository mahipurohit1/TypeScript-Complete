import React from "react";
import "./TodoList.css";
interface propsData {
  items: {
    id: string;
    text: string;
  }[];
  onDeleteData: (id: string) => void;
}

const TodoList: React.FC<propsData> = (props) => {
  const deleteHandler = (id: string) => {
    props.onDeleteData(id);
  };

  return (
    <ul>
      {props.items.map((todo) => {
        return (
          <li key={todo.id}>
            {todo.text}
            <button onClick={deleteHandler.bind(null, todo.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
