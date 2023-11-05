import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ToastContainer } from "react-toastify";

import getProduct from "../../helpers/getProduct";
import notify from "../../helpers/toastify.js";
import { ADD } from "../../redux/actions/action";
import { useDispatch } from "react-redux";
import Loading from "../Loading/Loading";

function ProductList() {
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getProduct()
      .then((data) => {
        setProductData(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(() => {
        notify("Error fetching product data:", "error");
        setLoading(false);
        localStorage.removeItem("apiKey");
        localStorage.removeItem("email");
        window.location.reload();
      });
  }, []);

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
    <div className="container" style={{ marginTop: "80px" }}>
      <h2 className="text-center">My Product</h2>
      <div className="row d-flex justify-content-center align-items-center">
        {productData.map((element, id) => {
          return (
            <React.Fragment key={id}>
              <Card
                style={{ width: "22rem", border: "none" }}
                className="mx-2 mt-4 card-style "
              >
                <Card.Img
                  variant="top"
                  src={element.image}
                  style={{ height: "16rem" }}
                  className="mt-3"
                />
                <Card.Body>
                  <Card.Title>{element.name}</Card.Title>
                  <Card.Text>Price: ${element.price}</Card.Text>
                  <div className="btn-add d-flex justify-content-center">
                    <Button
                      variant="primary"
                      className="col-lg-12"
                      onClick={() => handleAddToCart(element)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </React.Fragment>
          );
        })}
      </div>
      {loading && <Loading />}
      <ToastContainer />
    </div>
  );
}

export default ProductList;
