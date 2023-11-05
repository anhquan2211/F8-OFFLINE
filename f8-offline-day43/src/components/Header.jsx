import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Nav from "react-bootstrap/Nav";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { postOrder } from "../helpers/postOrder";
import { DELETE_ALL } from "../redux/actions/action";
import notify from "../helpers/toastify";
import Loading from "./Loading/Loading";
import Dialog from "./Dialog/Dialog";

function Header() {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataProductLocal, setDataProductLocal] = useState([]);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [idProductDelete, setIdProductDelete] = useState(null);

  const dataProductReducer = useSelector((state) => state.cartReducer.carts);

  useEffect(() => {
    const dataProduct = JSON.parse(localStorage.getItem("cart")) || [];
    setDataProductLocal(dataProduct);
  }, [dataProductReducer]);

  const dispatch = useDispatch();

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsShowModalDelete(false);
  };

  const handlePostOrder = () => {
    setLoading(true);
    const body = [];
    dataProductLocal.map((item) => {
      const dataItem = {
        productId: item._id,
        quantity: item.amount,
      };
      body.push(dataItem);
    });
    postOrder(body).then(({ data, res }) => {
      if (res.ok) {
        console.log("Đã gọi thành công postOrder");
        notify(`Bạn đã thanh toán ${data.message}`, "success");
        dispatch(DELETE_ALL());
        history("/");
      } else {
        notify("Thanh toán thất bại! Vui lòng thử lại.", "error");
      }
      setLoading(false);
    });
  };

  /**
   * Handles the deletion of a product item from the shopping cart.
   *
   * @param {string} id - The ID of the product to be deleted.
   */
  const deleteItem = (id) => {
    setIsShowModalDelete(true);
    setIdProductDelete(id);
  };

  useEffect(() => {
    let price = 0;
    dataProductLocal?.map((element) => {
      price = element.price * element.amount + price;
    });
    setPrice(price);
  }, [dataProductLocal, price]);

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        style={{
          height: "60px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      >
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">
            Add to Cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>

          <Badge
            badgeContent={dataProductLocal?.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ position: "relative", zIndex: 0 }}
          >
            <i
              className="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          disableScrollLock={true}
        >
          {dataProductLocal?.length ? (
            <div
              className="cart-details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Name Product</th>
                  </tr>
                </thead>

                <tbody>
                  {dataProductLocal.map((e, index) => {
                    const price = parseFloat(e.price).toLocaleString("en");
                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td>
                            <NavLink
                              to={`/cart/${e._id}`}
                              onClick={handleClose}
                            >
                              <img
                                src={e.image}
                                style={{ width: "5rem", height: "5rem" }}
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.name}</p>
                            <p>Price: ${price}</p>
                            <p>SL: {e.amount}</p>
                            <p>Còn: {e.quantity - e.amount} sản phẩm</p>
                          </td>
                          <td
                            className="mt-5"
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => deleteItem(e._id)}
                          >
                            <i className="fas fa-trash largetrash"></i>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                  <tr>
                    <td>
                      <p className="text-center">
                        Total: ${parseFloat(price).toLocaleString("en")}
                      </p>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>
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
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="cart-details d-flex justify-content-center align-item-center "
              style={{ width: "24rem", padding: 10, position: "relative" }}
            >
              <i
                className="fas fa-close smallclose"
                style={{
                  position: "absolute",
                  top: 14,
                  right: 20,
                  fontSize: 23,
                  cursor: "pointer",
                  zIndex: 2,
                }}
                onClick={handleClose}
              ></i>
              <p style={{ fontSize: 22 }}>Your Carts Is Empty</p>
            </div>
          )}
        </Menu>
      </Navbar>

      <Dialog
        show={isShowModalDelete}
        handleClose={handleClose}
        idProductDelete={idProductDelete}
      />

      {loading && <Loading />}
    </>
  );
}

export default Header;
