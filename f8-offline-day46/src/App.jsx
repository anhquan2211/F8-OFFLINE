import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import CartProductDetail from "./components/CartProductDetail";
import ProductList from "./components/ProductList/ProductList";
import DetailProduct from "./components/DetailProduct/DetailProduct";
import CartDetail from "./components/CartDetail/CartDetail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart/:id" element={<CartProductDetail />} />
        <Route path="/detail/*" element={<DetailProduct />} />
        <Route path="/cart" element={<CartDetail />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
