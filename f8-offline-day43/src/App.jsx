import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import notify from "./helpers/toastify";
import Header from "./components/Header";
import CartProductDetail from "./components/CartProductDetail";
import ProductList from "./components/ProductList/ProductList";
import getProfile from "./helpers/getProfile";

function App() {
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    let apiKey = localStorage.getItem("apiKey");
    if (apiKey) {
      setApiKey(apiKey);
      getProfile()
        .then((data) => {
          if (data) {
            notify(`Chào mừng ${data} quay trở lại`, "success");
          } else {
            notify("Vui lòng đăng nhập lại!", "warning");
            localStorage.removeItem("apiKey");
            localStorage.removeItem("email");
            window.location.reload();
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            notify("Please Login", "warning");
          } else {
            console.error("Error:", error);
          }
        });
    } else {
      notify("Vui lòng đăng nhập để đặt hàng", "warning");
    }
  }, []);

  /**
   * Function to handle a successful login operation.
   *
   * @param {string} apiKey - The API key received upon successful login.
   * @param {string} email - The user's email address.
   */
  const handleLoginSuccess = (apiKey, email) => {
    notify("Chào bạn " + email.slice(0, email.indexOf("@")), "success");
    localStorage.setItem("apiKey", apiKey);
    localStorage.setItem("email", email);
    setApiKey(apiKey);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart/:id" element={<CartProductDetail />} />
      </Routes>
      {!apiKey && <Login onLoginSuccess={handleLoginSuccess} />}
      <ToastContainer />
    </>
  );
}

export default App;
