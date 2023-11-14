import { PropTypes } from "prop-types";
import { useLocation } from "react-router";

import "./Pagination.css";

const Pagination = (props) => {
  const { pagination, onPageChange } = props;
  const { page, totalPage } = pagination;
  const location = useLocation();
  console.log("page Pagination: ", page);

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
      console.log("newPage: ", newPage);
    }
  }
  return (
    <div className="btn-pagination-container">
      <button
        disabled={page <= 1}
        style={{
          cursor: `{${page <= 1} ? "not-allowed" : "default"}`,
        }}
        onClick={() => handlePageChange(page - 1)}
      >
        Prev
      </button>
      <button
        disabled={page >= totalPage}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: null,
};
