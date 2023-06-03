import React from "react";
import "./Input.css";
export default function Input({
  input = "",
  onChange = () => {},
  update = null,
  onAdd = () => {},
}) {
  return (
    <div className="input-wrap">
      <input
        type="text"
        name=""
        id="job"
        placeholder="Nhập tên công việc ..."
        onChange={onChange}
        value={input}
      />
      <button onClick={onAdd}>{(update !== null && "Sửa") || "Thêm"}</button>
    </div>
  );
}
