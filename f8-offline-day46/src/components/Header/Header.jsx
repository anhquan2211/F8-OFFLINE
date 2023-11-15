import { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Header.css";

function Header() {
  const [dataProductLocal, setDataProductLocal] = useState([]);
  const [amount, setAmount] = useState(0);

  const dataProductReducer = useSelector((state) => state.cartReducer.carts);

  /**
   * Executes an effect to update the local product data from the 'cart' in localStorage.
   * Updates 'dataProductLocal' based on 'dataProductReducer'.
   * Triggers when 'dataProductReducer' changes.
   */
  useEffect(() => {
    const dataProduct = JSON.parse(localStorage.getItem("cart")) || [];
    setDataProductLocal(dataProduct);
  }, [dataProductReducer]);

  /**
   * Executes an effect to calculate the total amount of products in 'dataProductLocal'.
   * Updates the 'amount' state based on the accumulated amount of items.
   * Triggers when 'dataProductLocal' changes.
   */
  useEffect(() => {
    const totalAmount = dataProductLocal.reduce(
      (acc, current) => acc + +current.amount,
      0
    );
    setAmount(totalAmount);
  }, [dataProductLocal]);

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
              <span className="length-cart">{amount}</span>
            </div>
          </NavLink>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
