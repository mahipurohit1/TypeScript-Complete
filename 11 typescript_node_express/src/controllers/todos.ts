import { RequestHandler } from "express";
import Todo from "../models/Todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res) => {
  const text = req.body.text as string;
  const newTodo = new Todo(text);

  TODOS.push(newTodo);

  res.json({ message: "Created the todo", newTodo });
};

export const getTodos: RequestHandler = (_req, res) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler = (req, res) => {
  const todoId = req.params.id as string;
  const updatedText = req.body.text as string;

  const index = TODOS.findIndex((todo) => todo.id === todoId);

  if (index < 0) throw new Error("Todo not found");

  TODOS[index].text = updatedText;

  res.json({ message: "Updated", updatedTodo: TODOS[index] });
};

export const deleteTodo: RequestHandler = (req, res) => {
  const todoId = req.params.id as string;

  const index = TODOS.findIndex((todo) => todo.id === todoId);

  if (index < 0) throw new Error("Todo not found");

  TODOS.splice(index, 1);

  res.json({ message: "Todo deleted" });
};
