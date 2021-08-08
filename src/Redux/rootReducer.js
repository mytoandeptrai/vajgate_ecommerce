import { combineReducers } from "redux";
import cartReducer from "./Cart/cart.reducer";
import categoryReducer from "./Categories/categories.reducer";
import orderReducer from "./Orders/order.reducer";
import productsReducer from "./Products/products.reducer";
import userReducer from "./User/user.reducer";

const rootReducer = combineReducers({
  usersData: userReducer,
  categoriesData: categoryReducer,
  productsData: productsReducer,
  cartsData: cartReducer,
  ordersData: orderReducer,
});

export default rootReducer;
