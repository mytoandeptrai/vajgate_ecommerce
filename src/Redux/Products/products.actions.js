import swal from "sweetalert";
import { firestore } from "../../Utilities/firebase/utils";
import productTypes from "./products.types";

export const layToanBoProductAction = () => {
  return async (dispatch) => {
    try {
      await firestore
        .collection("products")
        .get()
        .then((querySnapshot) => {
          const productArray = querySnapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              _id: doc.id,
            };
          });
          dispatch({
            type: productTypes.FETCH_ALL_PRODUCTS,
            payload: productArray,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const themSanPhamAction = (productData, resetForm) => {
  return async (dispatch) => {
    try {
      const timestamp = new Date();
      await firestore
        .collection("products")
        .doc()
        .set({
          ...productData,
          createdAt: timestamp,
        })
        .then(() => {
          dispatch({
            type: productTypes.ADD_NEW_PRODUCT,
          });
          dispatch(layToanBoProductAction());
          resetForm();
          swal("Thành công", "Thêm dữ liệu thành công", "success");
        })
        .catch((error) => {
          swal("Thất bại", "Thêm dữ liệu thất bại", "warning");
        });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const layChiTietSanPham = (productId) => {
  return async (dispatch) => {
    try {
      await firestore
        .collection("products")
        .doc(productId)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.exists) {
            const productDetails = {
              ...querySnapshot.data(),
              _id: querySnapshot.id,
            };
            dispatch({
              type: productTypes.FETCH_PRODUCT_START,
              payload: productDetails,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
};
