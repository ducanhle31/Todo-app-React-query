import { useState} from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import "./App.css";
import Header from "./Header";
import Input from "./Input";
import List from "./List";
import Filter from "./Filter";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  editTodo,
  deleteAllTodo
} from "./api/todoApi";


function App() {
  const [input, setInput] = useState("");
  const [job, setJob] = useState(JSON.parse(localStorage.getItem("job")) ?? []);

  const [status, setStatus] = useState("Tất cả");
  const [update, setUpdate] = useState(null);

  const queryClient = useQueryClient();
  const { isLoading, isError, error, data: todos = [] } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos
  });

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old) => [...old, newTodo]);

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
      console.error("Oops! Thêm todo thất bại, thử lại sau");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });
  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });

  const editTodoMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });
  const deleteAllTodoMutation = useMutation({
    mutationFn: deleteAllTodo,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (update === null) {
      if (input != "") {
        addTodoMutation.mutate({
          userId: Math.random() * 100000,
          title: input,
          completed: false
        });
      }
    } else {
      editTodoMutation.mutate({ ...update, todo: input });
      setUpdate(null);
    }
    setInput("");
  };
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
  };
  const handleDelete = (todo) => {
    deleteTodoMutation.mutate({ id: todo.id });
  
  };
  const handleComplete = (data) => {
    updateTodoMutation.mutate({ ...data, completed: !data.completed });
  
  };
  const handleEdit = (data) => {
    setInput(data.todo);
    setUpdate(data);
  };
  //
  console.log(status);
  let filter = [];
  if (!isLoading) {
    filter = todos.filter((item) => {
      if (status == "Tất cả") {
        return item;
      } else if (status == "Hoàn thành") {
        return item.completed;
      } else {
        return !item.completed;
      }
    });
  }

  //Filter function
  const handleFilter = (data) => {
    switch (data) {
      case "Tất cả":
        setStatus(data);
        break;
      case "Hoàn thành":
        setStatus(data);
        break;
      case "Chưa hoàn thành":
        setStatus(data);
        break;
      case "Xóa tất cả":
        deleteAllTodoMutation.mutate([]);
        localStorage.setItem("job", JSON.stringify([]));
        setStatus("Tất cả");
        break;
    }
  };

  //
  console.log(todos);
  let content;
  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="app">
      <Header />
      <Input
        input={input}
        onChange={handleChange}
        onAdd={handleSubmit}
        update={update}
      />
      <List
        data={filter}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onComplete={handleComplete}
      />
      <Filter status={status} onFilter={handleFilter} />
    </div>
  );
}

export default App;
