import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cartTypes from "../../../Redux/Cart/cart.types";
import Modal from "./Modal";
import "./style.css";
const ProductItem = ({ product, key }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const day = dayjs(product.birthday).format("DD-MM-YYYY");

  const openModel = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleAddToCart = (cartItem) => {
    dispatch({
      type: cartTypes.ADD_TO_CART,
      payload: cartItem,
    });
  };

  return (
    <>
      <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="prouduct_cart">
          {product.price > 1200 ? (
            <>
              <div className="prouduct_cart-new">New</div>
            </>
          ) : (
            ""
          )}

          {isAdmin ? (
            <input
              type="checkbox"
              checked={product.checked}
              className="prouduct_cart-checkbox"
              // onChange={onHandleChange}
            ></input>
          ) : (
            ""
          )}

          <Link to={`/detail/${product._id}`}>
            <img
              src={product.images}
              alt="product-item"
              className="product-img"
            ></img>
          </Link>

          <div className="content">
            <Link to={`/detail/${product._id}`}>
              <div className="product-name">{product.name}</div>
            </Link>
            {isAdmin ? (
              ""
            ) : (
              <>
                <div className="price">${product.price} / 1h</div>
                <div
                  className="btn-addtocart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </div>
              </>
            )}
          </div>

          <button className="quick-look" onClick={openModel}>
            <div>Quick look</div>
          </button>

          <button
            className="rp-btn-addtocart"
            onClick={() => handleAddToCart(product)}
          >
            <div>Add to cart</div>
          </button>
        </div>

        {isAdmin ? (
          <div className="product_admin-btn">
            <div
              className="product_admin-delete"
              //   onClick={() =>
              //     deleteProduct(product._id, product.images.public_id)
              //   }
            >
              Delete
            </div>
            <div className="product_admin-edit">
              {" "}
              <Link
                to={`/product/edit/${product._id}`}
                style={{ color: "white" }}
              >
                Edit
              </Link>
            </div>
          </div>
        ) : (
          <></>
        )}
        <Modal
          product={product}
          isAdmin={isAdmin}
          openModal={openModal}
          closeModal={closeModal}
          day={day}
          handleAddToCart={handleAddToCart}
        />
      </div>
    </>
  );
};

export default ProductItem;
