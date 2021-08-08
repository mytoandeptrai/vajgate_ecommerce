import swal from "sweetalert";
import { firestore } from "../../Utilities/firebase/utils";
import orderTypes from "./order.types";

export const layToanBoOrderAction = () => {
  return async (dispatch) => {
    try {
      let ref = await firestore.collection("orders").orderBy("orderDate");
      ref.get().then((querySnapshot) => {
        const orderArray = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            _id: doc.id,
          };
        });
        dispatch({
          type: orderTypes.FETCH_ALL_ORDERS,
          payload: orderArray,
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const themOrderAction = (orderData) => {
  return async (dispatch) => {
    try {
      await firestore
        .collection("orders")
        .doc()
        .set(orderData)
        .then(() => {
          dispatch({
            type: orderTypes.ADD_NEW_ORDER,
          });
          dispatch(layToanBoOrderAction());
          //   swal("Thành công", "Đặt hàng thành công", "success");
        })
        .catch((error) => {
          swal("Thất bại", "Đặt hàng thất bại", "warning");
        });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const layOrderNguoiDung = (userId) => {
  return async (dispatch) => {
    try {
      let ref = await firestore.collection("orders").orderBy("orderDate");
      ref = ref.where("orderUserId", "==", userId);
      ref.get().then((querySnapshot) => {
        const orderArray = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            _id: doc.id,
          };
        });
        dispatch({
          type: orderTypes.FETCH_ORDER_HISTORY,
          payload: orderArray,
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
