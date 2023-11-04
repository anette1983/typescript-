import TodoItem from "./Components/TodoItem";
import AddTodoForm from "./Components/AddTodoForm";
import "./App.css";
import React, { useState } from "react";


// 1) треба типізувати фкцію апп (це необов'язк)
// спочатку типізуємо стейт
// типізація стейту
// будемо отримувати об'єкт з 2 полями  const newTodo = { id: Date.now(), text };
// для типізації об'єкту використ тайп або інтерфейс (майже одне)
// пишемо типізацію перед компонентом
export interface Task {
  id: number;
  text: string;
}

function App() {
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState<Task[]>([]);
  // при роботі з реактом необов'язково проводити типізацію ретерна, якщо явно нічого не повертається
  // const addTodo = (text) => {
  //   const newTodo = { id: Date.now(), text };
  //   setTodos([...todos, newTodo]);
  // };
  // типізуємо параметр фкції
  const addTodo = (text: string) => {
    // оскільки айді створюється динамічно, ми його не передаємо, то його не треба типізувати
    const newTodo = { id: Date.now(), text };
    setTodos([...todos, newTodo]);
  };

  // const deleteTodo = (id) => {
  //   const newTodos = todos.filter((todo) => todo.id !== id);
  //   setTodos(newTodos);
  // };
  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <AddTodoForm onAdd={addTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
