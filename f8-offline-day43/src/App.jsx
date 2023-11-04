import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import notify from "./helpers/toastify";
import Header from "./components/Header";
import CartProductDetail from "./components/CartProductDetail";
import ProductList from "./components/ProductList/ProductList";
import getProduct from "./helpers/getProduct";

function App() {
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    let apiKey = localStorage.getItem("apiKey");
    let email = localStorage.getItem("email");
    if (apiKey) {
      setApiKey(apiKey);
      notify(
        "Chào mừng bạn quay trở lại " + email.slice(0, email.indexOf("@")),
        "success"
      );
    }
  }, []);

  useEffect(() => {
    // getProduct();
  }, []);

  const handleLoginSuccess = (apiKey, email) => {
    notify("Chào bạn " + email.slice(0, email.indexOf("@")) + "!", "success");
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
