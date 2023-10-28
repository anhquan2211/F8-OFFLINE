import propTypes from "prop-types";

export default function Button({
  onClick,
  type,
  disabled,
  className,
  children,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${className || ""}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: propTypes.func,
  type: propTypes.string.isRequired,
  disabled: propTypes.bool,
  style: propTypes.string,
  className: propTypes.string,
  children: propTypes.node.isRequired,
};
