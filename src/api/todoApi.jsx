import axios from "axios";

const todosApi = axios.create({
  baseURL: "https://jsonserver-fhn2.onrender.com/api"
});

export const getTodos = async () => {
  const response = await todosApi.get("/todos");
  return response.data;
};

export const addTodo = async (todo) => {
  return await todosApi.post("/todos", todo);
};

export const updateTodo = async (todo) => {
  return await todosApi.patch(`/todos/${todo.id}`, todo);
};

export const deleteTodo = async ({ id }) => {
  return await todosApi.delete(`/todos/${id}`, id);
};

export const editTodo = async (todo) => {
  return await todosApi.put(`/todos/${todo.id}`, todo);
};
export const deleteAllTodo = async (arr) => {
  return await todosApi.clear(`/todos`,arr);
};
export default todosApi;
