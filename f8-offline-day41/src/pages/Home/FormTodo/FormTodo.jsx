/* eslint-disable no-undef */
// Import thư viện
import propTypes from "prop-types";

// Import File
import HttpClient from "../../../configs/client";
import { endpoint } from "../../../configs/config";
import Button from "../../../components/Button/Button";
import "./FormTodo.css";
import { accessToast, failedToast } from "../../../helpers/toastify";

//Khởi tạo đối tượng client từ class Client
const client = new HttpClient();

export default function FormTodo({
  apiKey,
  setTodosList,
  loading,
  setGlobalLoading,
}) {
  async function addTodo(todo) {
    const { res, data } = await client.post(
      endpoint.todos,
      { todo },
      {},
      apiKey
    );
    console.log("res addTodo: ", res);
    console.log("apiKey addTodo: ", apiKey);
    if (res.ok) {
      const response = data.data;
      const newTodo = {
        id: response._id,
        todo: response.todo,
        createdAt: response.createdAt,
        isCompleted: response.isCompleted,
      };
      console.log(newTodo);
      setTodosList((todosList) => [newTodo, ...todosList]);
      return newTodo;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;
    if (!loading && target.todo.value.length > 1) {
      setGlobalLoading(true);
      try {
        await addTodo(target.todo.value);
        target.todo.value = "";

        accessToast("Thêm công việc thành công!");
      } catch (e) {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("apiKey");

        failedToast("Có lỗi xảy ra, vui lòng reload lại!");

        setTimeout(() => window.location.reload(), 2000);
      } finally {
        setGlobalLoading(false);
      }
    } else {
      failedToast("Todo cần có trên 1 ký tự!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-submit">
      <div className="submit-wrapper">
        <input
          type="text"
          name="todo"
          placeholder="Thêm một việc làm mới"
          autoFocus
          className="input-add-todos"
        />
        <Button
          style="success"
          className="btn-submit"
          type="submit"
          loading={loading}
          disabled={loading}
        >
          Thêm mới
        </Button>
      </div>
    </form>
  );
}

FormTodo.propTypes = {
  apiKey: propTypes.string,
  setTodosList: propTypes.func,
  loading: propTypes.bool,
  setGlobalLoading: propTypes.func,
};
