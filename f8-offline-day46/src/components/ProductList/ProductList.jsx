import React, { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ToastContainer } from "react-toastify";
import { useNavigate, useMatch, useLocation, NavLink } from "react-router-dom";
import queryString from "query-string";
import ReactPaginate from "react-paginate";

import getProduct from "../../helpers/getProduct";
import notify from "../../helpers/toastify.js";
import { ADD } from "../../redux/actions/action";
import { useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
import { config } from "../../configs/config.js";
import removeAccent from "../../helpers/removeAccent.js";
import "./ProductList.css";

function ProductList() {
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemPerPage = config.LIMIT;
  const location = useLocation();
  const paramsRef = useRef({
    limit: config.LIMIT,
    page: 1,
    totalPage: 0,
  });

  const totalPageRef = useRef(0);

  // Check if current page is the first page
  const isFirstPage = +paramsRef.current.page === 1;

  // Check if current page is the last page
  const isLastPage = +paramsRef.current.page === totalPageRef.current.length;

  let pageParams = location.search.slice(1).split("&")[0].split("=")[1];

  const navigate = useNavigate();
  const match = useMatch("/products");
  const dispatch = useDispatch();

  useEffect(() => {
    const newFilter = { ...paramsRef.current, page: pageParams };

    paramsRef.current = newFilter;

    const paramString = queryString.stringify({
      limit: newFilter.limit,
      page: newFilter.page,
    });
    getProduct(paramString)
      .then((data) => {
        totalPageRef.current = [...Array(data.totalPage + 1).keys()].slice(1);

        setProductData(data.listProduct);
        paramsRef.current = { ...newFilter, totalPage: data.totalPage };
        if (
          data.listProduct.length === 0 ||
          !location.search.startsWith("?page=") ||
          !location.pathname.startsWith("/products") ||
          isNaN(+pageParams)
        ) {
          navigate("/products?page=1");
        }

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(() => {
        notify("Error fetching product data:", "error");
        setLoading(false);
      });
  }, [location.search]);

  //Pagination react

  useEffect(() => {
    const endOffset = itemOffset + itemPerPage;
    setCurrentItems(productData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(totalPageRef.current.length));
  }, [itemOffset, itemPerPage, productData]);

  // Invoke when user click to request another page.
  const handlePageClick = (data) => {
    setLoading(true);
    const selectedPage = data.selected + 1;
    setItemOffset(data.selected * itemPerPage);
    const queryParams = { page: selectedPage };
    const searchString = queryString.stringify(queryParams);
    navigate(`/products?${searchString}`);
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

  const handleClickImg = (element) => {
    localStorage.setItem("detail", JSON.stringify(element));
  };

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <h2 className="text-center">My Product</h2>
      <div className="row d-flex justify-content-center align-items-center product-container">
        {productData?.map((element, id) => {
          const nameEle = removeAccent(element.name);
          return (
            <React.Fragment key={id}>
              <Card
                style={{ width: "22rem", border: "none" }}
                className="mx-2 mt-4 card-style "
              >
                <NavLink to={`/detail/name~${nameEle}/${element._id}`}>
                  <Card.Img
                    variant="top"
                    src={element.image}
                    style={{ height: "16rem" }}
                    className="mt-3 image-product"
                    onClick={() => {
                      handleClickImg(element);
                    }}
                  />
                </NavLink>
                <Card.Body>
                  <Card.Title>{element.name}</Card.Title>
                  <Card.Text>
                    Price: ${element.price.toLocaleString()}
                  </Card.Text>
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

        <ReactPaginate
          breakLabel="..."
          nextLabel={isLastPage ? null : "next >"}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel={isFirstPage ? null : "< previous"}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
          initialPage={+pageParams - 1}
        />
      </div>

      {loading && <Loading />}
      <ToastContainer />
    </div>
  );
}

export default ProductList;
