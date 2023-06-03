import React from "react";
import "./Item.css";
export default function Item({ data, onDelete, onComplete, onEdit }) {
  return (
    <li className={(data.completed == true && "complete") || ""}>
      <input
        type="checkbox"
        name=""
        id=""
        onChange={() => {
          onComplete(data);
        }}
        checked={data.completed}
      />
      <p>{data.todo}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          onEdit(data);
        }}
      >
        <ion-icon name="create-outline"></ion-icon>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          onDelete(data);
        }}
      >
        <ion-icon name="trash-outline"></ion-icon>
      </button>
    </li>
  );
}
