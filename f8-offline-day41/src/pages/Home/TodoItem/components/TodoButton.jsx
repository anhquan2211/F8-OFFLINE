import propTypes from "prop-types";
import { useState } from "react";

import Button from "../../../../components/Button/Button";
import "../assets/TodoButton.css";

export default function TodoButtons({
  todoItem,
  setTodoItem,
  isEditable,
  setIsEditable,
  loading,
  handleUpdate,
  handleDelete,
}) {
  const [prevState, setPrevState] = useState(todoItem);
  return (
    <div className="btn-wrapper">
      {isEditable && (
        <>
          <Button
            className="btn-exits"
            onClick={() => {
              setIsEditable(false);
              console.log(prevState);
              setTodoItem(prevState);
            }}
            disabled={loading}
            loading={loading}
            style="warn"
            type="button"
          >
            Thoát
          </Button>

          <Button
            className="btn-update"
            style={"success"}
            onClick={handleUpdate}
            loading={loading}
            disabled={loading}
            type="button"
          >
            Update
          </Button>
        </>
      )}
      {!isEditable && (
        <Button
          className="btn-edit"
          style={"success"}
          onClick={() => {
            console.log(todoItem);
            setIsEditable(true);
            setPrevState(todoItem);
          }}
          loading={loading}
          disabled={loading}
          type="button"
        >
          Sửa
        </Button>
      )}
      <Button
        style={"danger"}
        type="button"
        onClick={handleDelete}
        loading={loading}
        disabled={loading}
        className="btn-delete"
      >
        Xóa
      </Button>
    </div>
  );
}

TodoButtons.propTypes = {
  isEditable: propTypes.bool.isRequired,
  setIsEditable: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  handleUpdate: propTypes.func.isRequired,
  handleDelete: propTypes.func.isRequired,
  todoItem: propTypes.object,
  setTodoItem: propTypes.func,
};
