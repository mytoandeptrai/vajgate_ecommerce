import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartContent from "../../Components/CartContent";
import CartTotal from "../../Components/CartTotal";
import CheckOutForm from "../../Components/CheckOutForm";
import { TotalPriceOfCarts } from "../../Redux/Cart/cart.helpers";
import "./style.css";
const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cartItems = useSelector((state) => state.cartsData.cartItems);
  const total = TotalPriceOfCarts(cartItems);

  const [step, setStep] = useState(1);

  const getStepContent = (step) => {
    switch (step) {
      case 1:
        return <CartTotal total={total} setStep={setStep} />;
      case 2:
        return (
          <CheckOutForm total={total} cartItems={cartItems} setStep={setStep} />
        );
      default:
        break;
    }
  };

  return (
    <>
      <div className="cart">
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <h2>Cart Empty</h2>
            <img
              className="cart-empty-image"
              src="https://i1.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1"
              alt="cart-empty"
            ></img>
          </div>
        ) : (
          <>
            <div className="cart-banner">
              <div className="cart-container cart-banner-f">
                <div>Cart</div>
                <div className="cart-banner-home">
                  <Link to="">Home</Link>
                  &nbsp;/
                  <span> Cart</span>
                </div>
              </div>
            </div>

            <div className="cart-container">
              <h2 className="cart-title">Shopping Cart</h2>
              <div className="cart-body">
                <CartContent cartItems={cartItems} />
                {getStepContent(step)}
              </div>
            </div>
          </>
        )}
        <div className="cart-container">
          <Link to="/" className="cart-to-home">
            <i
              className="fas fa-long-arrow-alt-left"
              style={{ marginRight: "5px" }}
            ></i>
            Go Back To Shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
