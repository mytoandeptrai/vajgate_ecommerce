import { combineReducers } from "redux";
import categoryReducer from "./Categories/categories.reducer";
import productsReducer from "./Products/products.reducer";
import userReducer from "./User/user.reducer";

const rootReducer = combineReducers({
  usersData: userReducer,
  categoriesData: categoryReducer,
  productsData: productsReducer,
});

export default rootReducer;
