import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import DetailProduct from "./components/DetailProduct/DetailProduct";
import CartDetail from "./components/CartDetail/CartDetail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/detail/*" element={<DetailProduct />} />
        <Route path="/cart" element={<CartDetail />} />
        <Route path="*" element={<ProductList />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
