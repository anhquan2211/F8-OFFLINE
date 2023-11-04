import React from "react";
import { ToastContainer } from "react-toastify";

import { emailRegex } from "../../helpers/regex";
import getApiKey from "../../helpers/getApiKey";
import notify from "../../helpers/toastify";
import "./Login.css";

function Login({ onLoginSuccess }) {
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
        }
      });
    } else {
      notify("Vui lòng nhập đúng định dạng Email!", "error");
    }
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

      <ToastContainer />
    </div>
  );
}

export default Login;
