import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Nav from "react-bootstrap/Nav";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { DELETE } from "../redux/actions/action";
// import { toast } from "react-toastify";
// import { toToastItem } from "react-toastify/dist/utils";

function Header() {
  const [price, setPrice] = useState(0);

  const getData = useSelector((state) => state.cartReducer.carts);
  // console.log(getData);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteItem = (id) => {
    dispatch(DELETE(id));
  };

  useEffect(() => {
    let price = 0;
    getData?.map((element) => {
      price = element.price * element.amount + price;
    });
    setPrice(price);
  }, [getData, price]);

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
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
            badgeContent={getData?.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
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
        >
          {getData?.length ? (
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
                  {getData.map((e, index) => {
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
                            <p>Price: ${e.price}</p>
                            <p>SL: {e.amount}</p>
                            <p>Còn: {e.quantity} sản phẩm</p>
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
                  <p className="text-center">Total: ${price}</p>
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
    </>
  );
}

export default Header;
