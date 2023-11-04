import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  text: string;
}
// беремо інтерфейс тайски з апу, це типизація стейту

const initialState: Task[] = [];
// ініт стейт - це масив тасків і він пустий спочатку

// створюємо сайс за доп креійейт слайс

const todoSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    //   const addTodo = (text: string) => {
    //     const newTodo = { id: Date.now(), text };
    //     setTodos([...todos, newTodo]);
    //   }; переносимо в редюсер цей метод
    addTodo: (state, action: PayloadAction<string>) => {
      state.push({ id: Date.now(), text: action.payload });
    },
    // action треба типізувати за доп PayloadAction - готовий тип з тулкітаале, треба вказати, що екшн буде приймати (те ж, що об'єкт)

    //   const deleteTodo = (id: number) => {
    // const newTodos = todos.filter((todo) => todo.id !== id);
    // setTodos(newTodos);
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter((todo: Task) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
