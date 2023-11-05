import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { ADD, DECREASE } from "../redux/actions/action";
import notify from "../helpers/toastify";
import DialogDetailPage from "../components/Dialog/DialogDetailPage";

function CartProductDetail() {
  const dataProductLocal = JSON.parse(localStorage.getItem("cart"));
  const [data, setData] = useState([dataProductLocal]);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [idProductDelete, setIdProductDelete] = useState(null);

  const { id } = useParams();

  const dispatch = useDispatch();

  const getData = useSelector((state) => state.cartReducer.carts);

  const compare = () => {
    let compareData = getData.filter((e) => e._id === id);
    setData(compareData);
  };

  /**
   * Handles the addition of a product to the shopping cart.
   *
   * @param {Object} element - The product to be added to the cart.
   */
  const handleAddToCart = (element) => {
    dispatch(ADD(element));
    notify(`Đã thêm ${element.name} vào giỏ hàng`, "success");
  };

  /**
   * Closes the delete confirmation dialog.
   */
  const handleClose = () => {
    setIsShowModalDelete(false);
  };

  /**
   * Handles the deletion of a product from the shopping cart.
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

  useEffect(() => {
    compare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Item Details Page</h2>

        <section className="container mt-3">
          <div className="item-detail d-flex" style={{ columnGap: "40px" }}>
            {data.map((element, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="item-img">
                    <img src={element.image} alt="" />
                  </div>

                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Name</strong>: {element.name}
                          </p>
                          <p>
                            <strong>Price</strong>: ${" "}
                            {parseFloat(element.price).toLocaleString("en")}
                          </p>
                          <p>
                            <strong>Address</strong>: Ha Noi
                          </p>
                          <p>
                            <strong>Total</strong>: $
                            {parseFloat(
                              element.price * element.amount
                            ).toLocaleString("en")}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
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
                                element.amount <= 1
                                  ? () => deleteItem(element._id)
                                  : () => decrease(element)
                              }
                            >
                              -
                            </span>
                            <span style={{ fontSize: 22 }}>
                              {element.amount}
                            </span>
                            <span
                              style={{ fontSize: 24 }}
                              onClick={() => handleAddToCart(element)}
                            >
                              +
                            </span>
                          </div>
                        </td>

                        <td>
                          <p>
                            <strong>Rating: </strong>
                            <span
                              style={{
                                background: "green",
                                color: "#fff",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              3.5 ★
                            </span>
                          </p>

                          <p>
                            <strong>Order Review: </strong>
                            <span>1k order placed from here</span>
                          </p>

                          <p>
                            <strong>Remove: </strong>
                            <span onClick={() => deleteItem(element._id)}>
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
                        </td>
                      </tr>
                    </Table>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </section>
      </div>

      <DialogDetailPage
        show={isShowModalDelete}
        handleClose={handleClose}
        idProductDelete={idProductDelete}
      />
    </>
  );
}

export default CartProductDetail;
