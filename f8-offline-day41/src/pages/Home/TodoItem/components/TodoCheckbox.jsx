import propTypes from "prop-types";

import "../assets/TodoCheckbox.css";

export default function TodoCheckbox({
  id,
  isCompleted,
  loading,
  setTodoItem,
  todoItem,
}) {
  return (
    <div className="checkbox-container">
      <label htmlFor={id} className="text-checkbox">
        {!isCompleted ? "Not Completed" : "Completed"}
      </label>
      <input
        id={id}
        type="checkbox"
        checked={isCompleted}
        disabled={loading}
        onChange={(e) =>
          setTodoItem({ ...todoItem, isCompleted: e.target.checked })
        }
        className={`form-checkbox `}
      />
    </div>
  );
}

TodoCheckbox.propTypes = {
  id: propTypes.string.isRequired,
  isCompleted: propTypes.bool.isRequired,
  setTodoItem: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  todoItem: propTypes.object.isRequired,
};
