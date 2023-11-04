import TodoItem from "./Components/TodoItem";
import AddTodoForm from "./Components/AddTodoForm";
import "./App.css";
// import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo } from "./todoSlice";
import { RootState } from "./store";

// 1) треба типізувати фкцію апп (це необов'язк)
// спочатку типізуємо стейт
// типізація стейту
// будемо отримувати об'єкт з 2 полями  const newTodo = { id: Date.now(), text };
// для типізації об'єкту використ тайп або інтерфейс (майже одне)
// пишемо типізацію перед компонентом
// export interface Task {
//   id: number;
//   text: string;
// }
// тепер нам не потрібен тут інтерфейс таск

function App() {
  // const [todos, setTodos] = useState<Task[]>([]);
  const todos = useSelector((state: RootState) => state.todos);
  // При витягуванні селектором стейту, треба його типізувати
  // за доп типу зі стору!!!
  const dispatch = useDispatch();
  // тут типізація не потрібна

  // const addTodo = (text: string) => {
  //   // оскільки айді створюється динамічно, ми його не передаємо, то його не треба типізувати
  //   const newTodo = { id: Date.now(), text };
  //   setTodos([...todos, newTodo]);
  // };

  // const deleteTodo = (id: number) => {
  //   const newTodos = todos.filter((todo) => todo.id !== id);
  //   setTodos(newTodos);
  // };
  // замість методів

  return (
    <div className="App">
      <h1>Todo List</h1>
      <AddTodoForm onAdd={(text) => dispatch(addTodo(text))} />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={(id) => dispatch(deleteTodo(id))}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
