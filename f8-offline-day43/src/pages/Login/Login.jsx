import { useState } from "react";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";

import { emailRegex } from "../../helpers/regex";
import getApiKey from "../../helpers/getApiKey";
import notify from "../../helpers/toastify";
import Loading from "../../components/Loading/Loading";
import "./Login.css";

/**
 * Login component to allow users to log in with their email.
 *
 * @param {object} props - React component props.
 * @param {function} props.onLoginSuccess - Callback function when login is successful.
 */
function Login({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);

  /**
   * Handles form submission for user login.
   *
   * @param {Event} e - The form submit event.
   */
  const handleSubmitLogin = (e) => {
    e.preventDefault();

    const emailUser = e.target.email.value;
    if (emailRegex(emailUser)) {
      getApiKey(emailUser).then((responseData) => {
        const { apiKey, email, response } = responseData;
        if (apiKey && email && response.ok) {
          onLoginSuccess(apiKey, email);
        } else {
          notify(`${responseData.message}`, "error");
          localStorage.removeItem("apiKey");
          localStorage.removeItem("email");
        }
      });
    } else {
      notify("Vui lòng nhập đúng định dạng Email!", "error");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="overlay"></div>
      <div className="login-content">
        <h1 className="title">Đăng nhập</h1>
        <p className="description">Vui lòng nhập địa chỉ email đã đăng ký F8</p>
        <form className="login-form" onSubmit={handleSubmitLogin}>
          <input type="text" placeholder="Email của bạn..." name="email" />

          <button className="btn-login" type="submit">
            Login
          </button>
        </form>
      </div>
      {loading && <Loading />}
      <ToastContainer />
    </div>
  );
}

export default Login;

Login.propTypes = {
  onLoginSuccess: PropTypes.func,
};
