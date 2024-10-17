import React, { useContext, useState } from "react";
import { TodoProviderWrapper } from "../providers/todo-provider/todo-provider";
import { DELETE_USER, EDIT_USER } from "../providers/todo-provider/todo-types";

export const CardWrapper = () => {
  const { data, dispatch } = useContext(TodoProviderWrapper);
  const [editingId, setEditingId] = useState(null); // Tahrirlanayotgan elementni saqlash uchun
  const [editedName, setEditedName] = useState(""); // Yangi nomni saqlash uchun

  const deleteItem = (id) => {
    dispatch({ type: DELETE_USER, id });
  };

  const editItem = (item) => {
    setEditingId(item.id); // Tahrirlanayotgan element ID sini belgilash
    setEditedName(item.user_name); // Tahrirlanayotgan elementning hozirgi nomini inputga joylash
  };

  const saveEdit = (id) => {
    dispatch({ type: EDIT_USER, id, newName: editedName });
    setEditingId(null); // Tahrir rejimini yopish
  };

  return (
    <div>
      {data?.users?.map((item) => (
        <div key={item.id}>
          {editingId === item.id ? (
            // Tahrir rejimi
            <>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <button onClick={() => saveEdit(item.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            // Oddiy ko'rinish
            <>
              <h1>{item.user_name}</h1>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
              <button onClick={() => editItem(item)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
