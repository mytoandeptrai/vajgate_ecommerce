import swal from "sweetalert";
import { firestore } from "../../Utilities/firebase/utils";
import productTypes from "./products.types";

export const layToanBoProductAction = (category) => {
  return async (dispatch) => {
    try {
      let ref = await firestore.collection("products").orderBy("createdAt");

      if (category && category !== "All")
        ref = ref.where("category", "==", category);

      ref.get().then((querySnapshot) => {
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
          rented: 0,
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

export const suaSanPhamAction = (productData, productId, history) => {
  return async (dispatch) => {
    try {
      await firestore
        .collection("products")
        .doc(productId)
        .update(productData)
        .then(() => {
          dispatch({
            type: productTypes.EDIT_PRODUCT_START,
          });
          dispatch(layToanBoProductAction());
          history.push("/");
          swal("Thành công", "Sửa dữ liệu thành công", "success");
        })
        .catch((error) => {
          swal("Thất bại", "Sửa dữ liệu thất bại", "warning");
        });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const xoaSanPhamAction = (productId) => {
  return async (dispatch) => {
    try {
      swal({
        title: "Bạn chắc chứ?",
        text: "Sản phẩm này xóa không thể khôi phục lại!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await firestore
            .collection("products")
            .doc(productId)
            .delete()
            .then(() => {
              dispatch({
                type: productTypes.DELETE_PRODUCT_START,
              });
              dispatch(layToanBoProductAction());
              swal("Thành công", "Xóa thành công", "success");
            })
            .catch(() => {
              swal("Thất bại", "Không thể xóa sản phẩm này", "warning");
            });
        }
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

export const layDanhSachSPLienQuan = (category) => {
  return async (dispatch) => {
    try {
      await firestore
        .collection("products")
        .where("category", "==", category)
        .get()
        .then((querySnapshot) => {
          const productArray = querySnapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              _id: doc.id,
            };
          });
          dispatch({
            type: productTypes.FETCH_PRODUCT_RELATIVE_START,
            payload: productArray,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  };
};
