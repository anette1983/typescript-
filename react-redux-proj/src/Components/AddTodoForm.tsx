import React, { useState, FC, FormEvent } from "react";

interface IAddTodoForm {
  onAdd: (text: string) => void;
}
const AddTodoForm: FC<IAddTodoForm> = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState<string>("");
  // типізація івентів!
  //   const handleSubmit = (e) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAdd(newTodo);
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Todo"
        value={newTodo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          // просто скопіювали з підказки реакту типізацію
          // або можемо скоротити запис, якщо імпорутеємо ченджівент окремо як сабмі івент і прибеоемо реакт
          setNewTodo(e.target.value)
        }
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
