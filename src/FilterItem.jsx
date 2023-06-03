import React from "react";
import "./Filter.css";
export default function FilterItem({ data, status, onFilter }) {
  return (
    <button
      className={(data == status && "active") || ""}
      onClick={(e) => {
        e.preventDefault();
        onFilter(data);
      }}
    >
      {data}
    </button>
  );
}
