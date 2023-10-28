// import React from "react";
import propTypes from "prop-types";

import "../assets/TodoItem.css";

export default function TodoInput({
  todoItem = {
    isCompleted: false,
    todo: "Loading...",
  },
  loading,
  isEditable,
  setTodoItem,
}) {
  return (
    <input
      className={`${
        todoItem.isCompleted ? "line-through todo-item-only" : "todo-item-only"
      }`}
      value={todoItem.todo}
      readOnly={!isEditable}
      disabled={loading}
      onChange={(e) =>
        setTodoItem((prev) => ({ ...prev, todo: e.target.value }))
      }
      onBlur={(e) => setTodoItem((prev) => ({ ...prev, todo: e.target.value }))}
    />
  );
}

TodoInput.propTypes = {
  todoItem: propTypes.shape({
    isCompleted: propTypes.bool,
    todo: propTypes.string,
  }),
  loading: propTypes.bool.isRequired,
  isEditable: propTypes.bool.isRequired,
  setTodoItem: propTypes.func.isRequired,
};
