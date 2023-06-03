import React from "react";
import Item from "./Item";
export default function List({ data, onDelete, onComplete, onEdit }) {
  const listItem = data.map((item, index) => (
    <Item
      key={index}
      data={item}
      onDelete={onDelete}
      onComplete={onComplete}
      onEdit={onEdit}
    />
  ));
  return (
    <ul>{listItem.length > 0 ? listItem : <p>Không có công việc nào</p>}</ul>
  );
}
