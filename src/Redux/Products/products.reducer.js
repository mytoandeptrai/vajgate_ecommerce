import productTypes from "./products.types";

const initialState = {
  isLoading: true,
  products: [],
  product: {},
  isLoadingDetail: true,
  productRelative: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case productTypes.FETCH_ALL_PRODUCTS:
      return {
        isLoading: false,
        products: action.payload,
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
        isLoadingDetail: false,
        product: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
