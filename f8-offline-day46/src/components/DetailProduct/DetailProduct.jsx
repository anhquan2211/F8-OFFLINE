import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ADD } from "../../redux/actions/action";
import notify from "../../helpers/toastify.js";
import "./DetailProduct.css";

const DetailProduct = () => {
  const productDetail = JSON.parse(localStorage.getItem("detail"));
  const dispatch = useDispatch();

  /**
   * Handles adding a product to the shopping cart and displays a notification.
   *
   * @param {Object} element - The product to be added to the cart.
   */
  const handleAddToCart = (element) => {
    dispatch(ADD(element));
    notify(`Đã thêm ${element.name} vào giỏ hàng`, "success");
  };

  return (
    <div className="detail-container">
      <h1>Detail Product Page</h1>
      <div className="info-product">
        <div className="img-container">
          <img src={productDetail.image} alt="image" />
        </div>
        <div className="info-detail">
          <h2 className="name-product">{productDetail.name}</h2>
          <h3 className="brand">Brand: {productDetail.brand}</h3>
          <h3 className="category">Category: {productDetail.category}</h3>
          <p className="description">{productDetail.description}</p>
          <p className="price">
            <b>${productDetail.price.toLocaleString()}</b>
          </p>
          <div className="quantity">
            Còn {productDetail.quantity.toLocaleString()} sản phẩm
          </div>
          <NavLink to="/products?page=1">
            <button className="btn-home">Go Home</button>
          </NavLink>
          <button
            className=" btn-add-cart"
            onClick={() => handleAddToCart(productDetail)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
