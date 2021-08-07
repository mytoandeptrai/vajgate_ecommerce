import React from "react";
import { Link } from "react-router-dom";
import { TotalPriceOfCarts } from "../../Redux/Cart/cart.helpers";
import "./style.css";
const CartHover = ({ cartItems, currentUser }) => {
  const totalPrice = TotalPriceOfCarts(cartItems);
  return (
    <>
      {cartItems.length === 0 || currentUser === null ? (
        ""
      ) : (
        <>
          <div className="cart-notify">
            <ul>
              {cartItems.map((product, index) => {
                return (
                  <li key={index} className="cart-notify-item">
                    <Link to={`/detail/${product._id}`}>
                      <img
                        src={product.images}
                        alt="product-img"
                        className="cart-notify-img"
                      ></img>
                    </Link>
                    <div className="cart-notify-info">
                      <div>
                        <Link
                          to={`/detail/${product._id}`}
                          className="cart-notify-name"
                        >
                          {product.name}
                        </Link>
                        <div
                          //   onClick={() => removeCartItem(product._id)}
                          className="cart-hover-remove"
                        >
                          x
                        </div>
                      </div>
                      <div className="cart-notify-quantity">
                        {product.quantity}h X ${product.price}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="cart-notify-total">
              <div className="cart-notify-total-l">Total:</div>
              <div className="cart-notify-total-n">${totalPrice}</div>
            </div>
            <Link to="/cart" className="cart-notify-btn view-cart-btn">
              View Cart
            </Link>
            <button className="cart-notify-btn payment-cart-btn">
              Payment
            </button>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default CartHover;
