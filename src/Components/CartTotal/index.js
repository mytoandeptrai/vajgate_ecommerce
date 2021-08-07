import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const CartTotal = ({ total }) => {
  return (
    <div className="cart-checkout">
      <h2>CART TOTALS</h2>
      <div className="cart-checkout-box">
        <div className="cart-subtotal">
          <div className="cart-subtotal-label">Subtotal</div>
          <div className="cart-subtotal-number">${total}</div>
        </div>
        <div className="cart-shipping">
          <div className="cart-shipping-label">Shipping</div>
          <p>
            This price is including shipping,taxs and the total price of your
            products . Please double check your address, or contact us if you
            need any help.
          </p>
        </div>
      </div>
      <div className="cart-total">
        <div className="cart-total-label">total</div>
        <div className="cart-total-number">${total}.00</div>
      </div>
      <Link to="#!" className="cart-payment-btn">
        Payment
      </Link>
      <div style={{ float: "right" }}></div>
    </div>
  );
};

export default CartTotal;
