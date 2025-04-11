// check file `vite.config.js` for details about `@`
import { client } from '../utils/httpClient';

// const USER_ID = 1831;

export const getTodos = () => {
  return client.get('/todos?userId=1831');
};

export const createTodo = (title) => {
  return client.post('/todos', {
    title,
    completed: false,
    userId: 1831,
  });
};

export const updateTodo = ({ id, title, completed }) => {
  return client.patch(`/todos/${id}`, {
    title,
    completed,
  });
};

export const deleteTodo = (todoId) => {
  return client.delete(`/todos/${todoId}`);
};