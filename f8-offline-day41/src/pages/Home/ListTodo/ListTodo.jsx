import propTypes from "prop-types";

import TodoItem from "../TodoItem";
import generateId from "../../../helpers/generateId";
import "./ListTodo.css";

export default function ListTodo({
  data = [],
  apiKey,
  setTodosList,
  loading,
  setGlobalLoading,
}) {
  return (
    <ul className="list-todo">
      {Array.isArray(data) && data.length > 0 ? (
        data.map(({ todo, isCompleted, id }) => {
          return (
            <TodoItem
              apiKey={apiKey}
              globalLoading={loading}
              setGlobalLoading={setGlobalLoading}
              key={generateId(id)}
              todo={todo}
              isCompleted={isCompleted}
              id={id}
              setTodosList={setTodosList}
            />
          );
        })
      ) : (
        <li className="no-todo">Không có todo</li>
      )}
    </ul>
  );
}

ListTodo.propTypes = {
  data: propTypes.array.isRequired,
  apiKey: propTypes.string,
  setTodosList: propTypes.func,
  loading: propTypes.bool,
  setGlobalLoading: propTypes.func,
};
