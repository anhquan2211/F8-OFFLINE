/* eslint-disable no-undef */
//Import Library
import { useEffect, useState } from "react";

//Import File
import getApiKey from "../helpers/getApiKey";
import { endpoint } from "../configs/config";
import HttpClient from "../configs/client";
import FormTodo from "../components/FormTodo/FormTodo";
import ListTodo from "../components/ListTodo/ListTodo";
import { accessToast, failedToast } from "../helpers/toastify";

//Khởi tạo đối tượng client từ class HttpClient.
const client = new HttpClient();

export default function Home() {
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));
  const [loading, setLoading] = useState(false);
  const [todosList, setTodosList] = useState([]);

  const getTodos = async (apiKey) => {
    console.log("Đã vào hàm để getTodo");
    const { data } = await client.get(endpoint.todos, {}, apiKey);
    console.log(data);
    if (data && data.data) {
      const todoList = data.data.listTodo.map((item) => {
        const newTodo = {
          id: item._id,
          todo: item.todo,
          createdAt: item.createdAt,
          isCompleted: item.isCompleted,
        };
        return newTodo;
      });
      return setTodosList(todoList);
    }
  };

  useEffect(() => {
    if (apiKey) {
      console.log(apiKey);

      getTodos(apiKey);
    }
  }, [apiKey]);

  useEffect(() => {
    setLoading(true);
    let userApiKey = localStorage.getItem("apiKey");

    //Kiểm tra có tồn tại apiKey ở trong localStorage hay không?
    if (!userApiKey) {
      const userEmail =
        localStorage.getItem("userEmail") ||
        window.prompt("Please enter your email:", "example@example.com");

      if (userEmail) {
        getApiKey(userEmail).then((response) => {
          const { apiKey, message } = response;
          if (message) {
            failedToast(`${message}. Vui lòng nhập lại!`);
            return setTimeout(() => window.location.reload(), 2000);
          }

          if (apiKey && userEmail) {
            setLoading(false);

            accessToast(
              "Chào bạn " + userEmail.slice(0, userEmail.indexOf("@"))
            );

            //Set apiKey và email to localStorage khi thành công
            localStorage.setItem("apiKey", apiKey);
            localStorage.setItem("userEmail", userEmail);
            setApiKey(apiKey);
          }
        });
      }
    } else {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        accessToast(
          "Chào mừng bạn quay trở lại " +
            localStorage
              .getItem("userEmail")
              .slice(0, localStorage.getItem("userEmail").indexOf("@"))
        );

        setApiKey(userApiKey);
        setLoading(false);
      } else {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("apiKey");
        window.location.reload();
      }
    }
  }, []);

  return (
    <>
      <main className="container">
        <div className="container-inner">
          <h1 className="title">Welcome to Todo App!</h1>
          {/* Form todo */}
          <FormTodo
            apiKey={apiKey}
            setTodosList={setTodosList}
            setGlobalLoading={setLoading}
            loading={loading}
          />
          {/* List todo */}
          <ListTodo
            setGlobalLoading={setLoading}
            loading={loading}
            data={todosList}
            apiKey={apiKey}
            setTodosList={setTodosList}
          />
        </div>
      </main>
    </>
  );
}
