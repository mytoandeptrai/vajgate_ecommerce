import orderTypes from "./order.types";

const initialState = {
  isLoadingOrder: true,
  orders: [],
  orderHistory: [],
  orderDetails: [],
  orderUserHistory: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderTypes.FETCH_ALL_ORDERS:
      return {
        ...state,
        isLoadingOrder: false,
        orders: action.payload,
      };
    case orderTypes.FETCH_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: action.payload,
      };
    case orderTypes.ADD_NEW_ORDER:
      return {
        ...state,
        isLoadingOrder: false,
      };
    default:
      return state;
  }
};

export default orderReducer;
