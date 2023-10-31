/* eslint-disable no-undef */
//Import Library
import { useEffect, useState } from "react";

//Import File
import getApiKey from "../../helpers/getApiKey";
import { endpoint } from "../../configs/config";
import HttpClient from "../../configs/client";
import FormTodo from "./FormTodo/FormTodo";
import ListTodo from "../Home/ListTodo/ListTodo";
import { accessToast, failedToast } from "../../helpers/toastify";
import Loading from "../../components/Loading/Loading";
import FilterTodo from "./FilterTodo";

//Khởi tạo đối tượng client từ class HttpClient.
const client = new HttpClient();

export default function Home() {
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));
  const [loading, setLoading] = useState(false);
  const [todosList, setTodosList] = useState([]);
  const [filters, setFilters] = useState({
    apiKey: apiKey,
    q: "",
  });

  const getTodos = async (apiKey) => {
    if (!loading) {
      setLoading(true);
      const { data, res } = await client.get(endpoint.todos, filters, apiKey);
      if (res.ok) {
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
          setTodosList(todoList);
        }
      }
      setLoading(false);
    }
  };

  function handleFilterChange(newFilters) {
    console.log("New Filters: ", newFilters);
    setFilters({
      ...filters,
      q: newFilters.searchTerm,
    });
  }

  useEffect(() => {
    if (apiKey) {
      getTodos(apiKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    let userApiKey = localStorage.getItem("apiKey");

    //Kiểm tra có tồn tại apiKey ở trong localStorage hay không?
    if (!userApiKey) {
      const userEmail =
        localStorage.getItem("userEmail") ||
        window.prompt("Please enter your email:", "example@example.com");

      if (userEmail) {
        getApiKey(userEmail).then((response) => {
          const { apiKey, message } = response;
          userApiKey = apiKey;
          if (message) {
            failedToast(`${message}. Vui lòng nhập lại!`);
            return setTimeout(() => window.location.reload(), 2000);
          }

          if (apiKey && userEmail) {
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
          <FilterTodo onSubmit={handleFilterChange} />
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
      {loading && <Loading />}
    </>
  );
}
