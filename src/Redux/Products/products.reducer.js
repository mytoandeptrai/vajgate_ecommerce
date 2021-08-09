import { handleFilterProductByPrice } from "./product.utils";
import productTypes from "./products.types";

const initialState = {
  isLoading: true,
  products: [],
  isFilter: false,
  isLoadingDetail: true,
  product: {},
  productRelative: [],
  productFilter: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case productTypes.FETCH_ALL_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        isFilter: false,
      };
    case productTypes.ADD_NEW_PRODUCT:
    case productTypes.DELETE_PRODUCT_START:
    case productTypes.EDIT_PRODUCT_START:
      return {
        ...state,
        isLoading: false,
      };
    case productTypes.FETCH_PRODUCT_START:
      return {
        ...state,
        product: action.payload,
        isLoadingDetail: false,
      };
    case productTypes.FETCH_PRODUCT_RELATIVE_START:
      return {
        ...state,
        productRelative: action.payload,
      };
    case productTypes.SORT_PRODUCT_BY_PRICE:
      return {
        ...state,
        productFilter: handleFilterProductByPrice({
          prevProductItems: state.products,
          price: action.payload,
        }),
        isFilter: true,
      };
    default:
      return state;
  }
};

export default productsReducer;
