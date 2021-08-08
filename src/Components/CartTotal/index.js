import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./style.css";
const CartTotal = ({ total, setStep }) => {
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
      <div style={{ float: "right" }}>
        <Button
          variant="contained"
          color="primary"
          className="btn-checkout"
          onClick={() => setStep(2)}
        >
          Check out
        </Button>
      </div>
    </div>
  );
};

export default CartTotal;
