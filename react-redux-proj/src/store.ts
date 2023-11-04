import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// говоримо, що хочемо повернути всі типи, які існують в сторі і вписати їх ц змінну
// поле getState в сторі, який щось повертає - це записуємо у змунні
// цю типизацію можна знайти в документації тулкіта
