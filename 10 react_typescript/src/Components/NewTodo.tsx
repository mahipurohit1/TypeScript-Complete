import React, { useRef } from "react";
import "./NewTodo.css";
interface props {
  onAddData: (data: { id: string; text: string }) => void;
}

const NewTodo: React.FC<props> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const data = inputRef.current!.value;
    if (data.trim().length === 0) {
      alert("please Enter something !!");
      return;
    }
    console.log(data);
    props.onAddData({
      id: Math.random().toString(),
      text: data,
    });
    inputRef.current!.value = "";
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="text">Task :</label> &nbsp; &nbsp;
        <input type="text" ref={inputRef} />
      </div>
      <br />
      <div>
        <button type="submit">Add Todo</button>
      </div>
    </form>
  );
};

export default NewTodo;
