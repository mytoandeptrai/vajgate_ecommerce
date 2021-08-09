import cartTypes from "./cart.types";

export const handleClearCart = () => {
  return (dispatch) => {
    dispatch({
      type: cartTypes.CLEAR_CART,
    });
  };
};
