import categoryTypes from "./categories.types";

const initialState = {
  isLoading: true,
  categories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryTypes.FETCH_ALL_CATEGORIES:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    case categoryTypes.ADD_NEW_CATEGORY:
    case categoryTypes.DELETE_CATEGORY:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
