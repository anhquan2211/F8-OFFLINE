import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Nav from "react-bootstrap/Nav";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { DELETE_ALL } from "../../redux/actions/action";
import Loading from "../Loading/Loading";
import Dialog from "../Dialog/Dialog";
import "./Header.css";

function Header() {
  const [loading, setLoading] = useState(false);
  const [dataProductLocal, setDataProductLocal] = useState([]);

  const dataProductReducer = useSelector((state) => state.cartReducer.carts);

  useEffect(() => {
    const dataProduct = JSON.parse(localStorage.getItem("cart")) || [];
    setDataProductLocal(dataProduct);
  }, [dataProductReducer]);

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
          <Nav className="me-auto">
            <NavLink
              to="/products?page=1"
              className="text-decoration-none text-light"
            >
              Home
            </NavLink>
          </Nav>

          <NavLink to="/cart">
            <div className="icon-cart" style={{ fontSize: 20 }}>
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="length-cart">{dataProductLocal.length}</span>
            </div>
          </NavLink>
        </Container>
      </Navbar>

      {loading && <Loading />}
    </>
  );
}

export default Header;
