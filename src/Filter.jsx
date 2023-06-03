import React from "react";
import FilterItem from "./FilterItem";
export default function Filter({ status, onFilter }) {
  const list = ["Tất cả", "Hoàn thành", "Chưa hoàn thành", "Xóa tất cả"];
  const filterList = list.map((item, index) => (
    <FilterItem key={index} data={item} status={status} onFilter={onFilter} />
  ));
  return <div className="filter">{filterList}</div>;
}
