import { useState, useRef } from "react";
import PropTypes from "prop-types";

import "./FilterTodo.css";

FilterTodo.propTypes = {
  onSubmit: PropTypes.func,
};

FilterTodo.defaultProps = {
  onSubmit: null,
};

function FilterTodo(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

  function handleSearchTermChange(e) {
    const value = e.target.value;
    setSearchTerm(value);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };

      onSubmit(formValues);
    }, 500);
  }

  return (
    <form className="form-filter">
      <input
        className="input-filter"
        placeholder="Tìm kiếm todo..."
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </form>
  );
}

export default FilterTodo;
