import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

import notify from "../../helpers/toastify";
import "./CartDetail.css";
import Dialog from "../Dialog/Dialog";
import { ADD, DECREASE, DELETE_ALL, DELETE } from "../../redux/actions/action";
import removeAccent from "../../helpers/removeAccent";

const CartDetail = () => {
  const [dataProductLocal, setDataProductLocal] = useState([]);
  const [price, setPrice] = useState(0);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [idProductDelete, setIdProductDelete] = useState(null);

  const dispatch = useDispatch();

  const history = useNavigate();

  const handleClose = () => {
    setIsShowModalDelete(false);
  };

  /**
   * Handles adding a product to the shopping cart and displays a notification.
   *
   * @param {Object} element - The product to be added to the cart.
   */
  const handleAddToCart = (element) => {
    dispatch(ADD(element));
    notify(`Đã thêm ${element.name} vào giỏ hàng`, "success");
  };

  /**
   *Handles the post-order process.
   *Notifies the user about successful payment.
   *Dispatches an action to delete all items from the cart.
   *Redirects the user to the products page after order completion.
   */
  const handlePostOrder = () => {
    notify(`Bạn đã thanh toán thành công`, "success");
    dispatch(DELETE_ALL());
    history("/products?page=1");
  };

  const dataProductReducer = useSelector((state) => state.cartReducer.carts);

  useEffect(() => {
    const dataProduct = JSON.parse(localStorage.getItem("cart")) || [];
    setDataProductLocal(dataProduct);
  }, [dataProductReducer]);

  /**
   * Handles the deletion of a product item from the shopping cart.
   *
   * @param {string} id - The ID of the product to be deleted.
   */
  const deleteItem = (id) => {
    setIsShowModalDelete(true);
    setIdProductDelete(id);
  };

  /**
   * Handles decreasing the quantity of a product in the shopping cart.
   *
   * @param {Object} item - The product to decrease the quantity of.
   */
  const decrease = (item) => {
    dispatch(DECREASE(item));
  };

  /**
   * Handles the adjustment of quantity for a specific item.
   * Deletes the item identified by the provided ID from the cart.
   * @param {string} id - The identifier of the item to adjust quantity for.
   */
  const handleQuantity = (id) => {
    dispatch(DELETE(id));
  };

  /**
   * Executes an effect to calculate the total price based on local product data.
   * Updates the 'price' state accordingly.
   * Dependencies on 'dataProductLocal' and 'price' trigger this effect.
   */
  useEffect(() => {
    let price = 0;
    dataProductLocal?.map((element) => {
      price = element.price * element.amount + price;
    });
    setPrice(price);
  }, [dataProductLocal, price]);

  return (
    <div className="cart-detail">
      {dataProductLocal.length ? (
        <>
          <h1>Cart Detail</h1>
          <div className="dataProduct-container">
            {dataProductLocal.map((dataProduct) => {
              return (
                <div className="product-item" key={dataProduct._id}>
                  <div className="img-container">
                    <NavLink
                      to={`/detail/name~${removeAccent(dataProduct.name)}/${
                        dataProduct._id
                      }`}
                    >
                      <img src={dataProduct.image} alt="image" />
                    </NavLink>
                  </div>
                  <div className="info-detail">
                    <h2 className="name-product">{dataProduct.name}</h2>
                    <h3 className="brand">Brand: {dataProduct.brand}</h3>
                    <h3 className="category">
                      Category: {dataProduct.category}
                    </h3>

                    <div className="amount-product">
                      <p className="price">
                        <b>${dataProduct.price.toLocaleString()}</b>
                      </p>
                      <p className="amount">
                        Số lượng: {dataProduct.amount.toLocaleString()}
                      </p>
                      <div className="quantity">
                        Còn{" "}
                        {dataProduct.quantity - dataProduct.amount < 0
                          ? handleQuantity(dataProduct._id)
                          : (
                              dataProduct.quantity - dataProduct.amount
                            ).toLocaleString()}{" "}
                        sản phẩm
                      </div>
                    </div>
                    <div
                      className=" d-flex justify-content-between align-items-center change-amount"
                      style={{
                        width: 100,
                        cursor: "pointer",
                        background: "#ddd",
                        color: "#111",
                      }}
                    >
                      <span
                        style={{ fontSize: 24 }}
                        onClick={
                          dataProduct.amount <= 1
                            ? () => deleteItem(dataProduct._id)
                            : () => decrease(dataProduct)
                        }
                      >
                        -
                      </span>
                      <span style={{ fontSize: 22 }}>{dataProduct.amount}</span>
                      <span
                        style={{ fontSize: 24 }}
                        onClick={() => handleAddToCart(dataProduct)}
                      >
                        +
                      </span>
                    </div>
                    <p style={{ fontSize: "20px" }}>
                      <strong>Remove: </strong>
                      <span onClick={() => deleteItem(dataProduct._id)}>
                        <i
                          className="fas fa-trash"
                          style={{
                            color: "red",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        ></i>
                      </span>
                    </p>
                    <div className="total-price">
                      <b>
                        Tổng: $
                        {(
                          dataProduct.amount * dataProduct.price
                        ).toLocaleString()}
                      </b>
                    </div>

                    <NavLink to="/products?page=1">
                      <button className="btn-home">Go Home</button>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="btn-checkout-container">
            <button
              className="btn btn-success"
              style={{
                border: "1px solid #ccc",
                padding: "10px 30px",
                borderRadius: "5px",
              }}
              onClick={handlePostOrder}
            >
              Thanh toán
            </button>
          </div>
          <div
            className="total-price-all"
            style={{
              border: "1px solid #ccc",
              padding: "10px 30px",
              borderRadius: "5px",
            }}
          >
            Tổng tiền: ${price.toLocaleString()}
          </div>
        </>
      ) : (
        <div
          className="none-cart"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: 22, textAlign: "center" }}>
            Your Carts Is Empty
          </h1>
          <NavLink to="/products?page=1" style={{ margin: "0 auto" }}>
            <button className="btn-home" style={{ padding: "10px 20px" }}>
              Go Home
            </button>
          </NavLink>
        </div>
      )}
      <Dialog
        show={isShowModalDelete}
        handleClose={handleClose}
        idProductDelete={idProductDelete}
      />
    </div>
  );
};

export default CartDetail;
