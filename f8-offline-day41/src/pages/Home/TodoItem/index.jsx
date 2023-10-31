/* eslint-disable no-undef */
import { useState } from "react";
import propTypes from "prop-types";

import Loading from "../../../components/Loading/Loading";
import HttpClient from "../../../configs/client";
import { endpoint } from "../../../configs/config";
import TodoInput from "./components/TodoInput";
import TodoButtons from "./components/TodoButton";
import TodoCheckbox from "./components/TodoCheckbox";
import { accessToast, failedToast } from "../../../helpers/toastify";

const client = new HttpClient();

export default function TodoItem({
  todo,
  isCompleted,
  id,
  apiKey,
  setTodosList,
  globalLoading,
  setGlobalLoading,
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(globalLoading);
  const [todoItem, setTodoItem] = useState({
    todo,
    isCompleted,
  });

  // Update Todo
  const handleUpdate = async () => {
    setLoading(true);
    if (!loading) {
      const body = {
        todo: todoItem.todo.trim(),
        isCompleted: todoItem.isCompleted,
      };
      const { res, data } = await client.patch(
        endpoint.todos + "/" + id,
        body,
        {},
        apiKey
      );
      if (res.ok) {
        setIsEditable(false);
        setTodoItem({
          todo: data.data.todo,
          isCompleted: data.data.isCompleted,
        });

        // Toastify cập nhật todo thành công
        accessToast("Cập nhật todo thành công!");
        setLoading(false);
      } else {
        // Toastify cập nhật todo thất bại
        failedToast("Cập nhật todo thất bại!");

        localStorage.removeItem("userEmail");
        localStorage.removeItem("apiKey");

        setTimeout(() => window.location.reload(), 2000);
      }
    }
  };

  // Delete todo
  const handleDelete = async () => {
    setGlobalLoading(true);
    if (!loading) {
      const { res } = await client.delete(
        endpoint.todos + "/" + id,
        {},
        apiKey
      );
      if (res.ok) {
        setTodosList((todosList) => todosList.filter((todo) => todo.id !== id));

        // Toastify xoá todo thành công
        accessToast("Xoá todo thành công!");
      } else {
        // Toastify xoá todo thất bại
        failedToast("Xoá todo thất bại!");

        localStorage.removeItem("userEmail");
        localStorage.removeItem("apiKey");

        setTimeout(() => window.location.reload(), 2000);
      }
      setGlobalLoading(false);
    }
  };

  return (
    <li key={id} className="todo-item">
      <TodoInput
        todoItem={todoItem}
        setTodoItem={setTodoItem}
        isEditable={isEditable}
        loading={loading}
      />
      <div className="action-btn">
        {isEditable && (
          <TodoCheckbox
            id={id}
            isCompleted={todoItem.isCompleted}
            todoItem={todoItem}
            setTodoItem={setTodoItem}
            loading={loading}
          />
        )}
        <TodoButtons
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          todoItem={todoItem}
          setTodoItem={setTodoItem}
          loading={loading}
          todo={todo}
          isCompleted={isCompleted}
        />
      </div>
      {loading && <Loading />}
    </li>
  );
}

TodoItem.propTypes = {
  todo: propTypes.string.isRequired,
  isCompleted: propTypes.bool.isRequired,
  id: propTypes.string.isRequired,
  apiKey: propTypes.string.isRequired,
  setTodosList: propTypes.func.isRequired,
  globalLoading: propTypes.bool.isRequired,
  setGlobalLoading: propTypes.func.isRequired,
};
