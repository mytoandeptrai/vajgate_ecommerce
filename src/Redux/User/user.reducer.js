import userTypes from "./user.types";

let userLogin = {};

const INITIAL_STATE = {
  signInSuccess: false,
  signUpSuccess: false,
  signUpError: null,
  currentUser: userLogin,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInSuccess: action.payload,
      };
    case userTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpSuccess: action.payload,
      };
    case userTypes.SIGN_UP_ERROR:
      return {
        ...state,
        signUpError: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
