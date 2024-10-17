import { useForm } from "react-hook-form";
import { CardWrapper } from "./components/card-wrapper";
import { TodoProviderWrapper } from "./providers/todo-provider/todo-provider";
import React from "react";
import { ADD_USER } from "./providers/todo-provider/todo-types";
import { nanoid } from "nanoid";

function App() {
  const { register, handleSubmit, reset } = useForm();
  const { dispatch, data } = React.useContext(TodoProviderWrapper);


  const submit = (data) => {
    dispatch({ type: ADD_USER, value: { ...data, id: nanoid() } });
    reset();
  };



  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <input {...register("user_name")} type="text" />
        <br />
        <input {...register("last_name")} type="text" />
        <br />
        <button type="submit">send</button>
      </form>
      <CardWrapper />
    </>
  );
}

export default App;
