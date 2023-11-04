import React, { FC } from "react";
import { Task } from "../../../react-redux-proj/src/todoSlice";

// типізуєемо сам компонент
// FC - це готовий тип
// Якщо компонент приймає пропси - прописати в дженерик

// interface TodoItemProps {}
interface ITodoItemProps {
  todo: Task;
  // у нас вже була в апп типізація елементу туду, можемо експортувати з апп інтерфейс
  onDelete: (id: number) => void;
}

const TodoItem: FC<ITodoItemProps> = ({ todo, onDelete }) => {
  return (
    <li>
      <p>{todo.text}</p>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
