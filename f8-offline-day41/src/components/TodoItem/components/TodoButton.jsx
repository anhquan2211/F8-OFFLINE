import propTypes from "prop-types";

import Button from "../../Button/Button";
import "../assets/TodoButton.css";

export default function TodoButtons({
  isEditable,
  setIsEditable,
  loading,
  handleUpdate,
  handleDelete,
}) {
  return (
    <div className="btn-wrapper">
      {isEditable && (
        <>
          <Button
            className="btn-exits"
            onClick={() => setIsEditable(false)}
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
      {console.log("isEditable: ", isEditable)}
      {!isEditable && (
        <Button
          className="btn-edit"
          style={"success"}
          onClick={() => setIsEditable(!isEditable)}
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
};
