import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cartTypes from "../../Redux/Cart/cart.types";
import "./style.css";
const CartContent = ({ cartItems }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (cartItem) => {
    dispatch({
      type: cartTypes.ADD_TO_CART,
      payload: cartItem,
    });
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch({
      type: cartTypes.REDUCE_CART_ITEM,
      payload: cartItem,
    });
  };

  const handleRemoveCart = (cartItem) => {
    dispatch({
      type: cartTypes.REMOVE_CART_ITEM,
      payload: cartItem,
    });
  };

  return (
    <>
      <div className="cart-content">
        <table className="cart-table">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((product, index) => {
              return (
                <tr className="cart-item" key={index}>
                  <td
                    className="cart-remove"
                    onClick={() => handleRemoveCart(product)}
                  >
                    x
                  </td>
                  <td className="cart-thumbnail">
                    <Link to={`/detail/${product._id}`}>
                      <img src={product.images} alt="product-img"></img>
                    </Link>
                  </td>
                  <td className="cart-name">
                    <Link to={`/detail/${product._id}`}>{product.name}</Link>
                  </td>
                  <td className="cart-price">${product.price} / 1h</td>
                  <td className="cart-quantitys">
                    <span className="cart-quantity-label">HOURS</span>
                    <button
                      className="cart-quantity-ct"
                      onClick={() => handleDecreaseCart(product)}
                    >
                      -
                    </button>
                    <span className="cart-quantity-number">
                      {product.quantity}
                    </span>
                    <button
                      className="cart-quantity-ct"
                      onClick={() => handleAddToCart(product)}
                    >
                      +
                    </button>
                  </td>
                  <td className="cart-price-t">
                    ${product.price * product.quantity}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CartContent;
