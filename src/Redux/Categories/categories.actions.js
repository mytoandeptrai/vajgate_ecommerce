import categoryTypes from "./categories.types";
import { firestore } from "./../../Utilities/firebase/utils";
import swal from "sweetalert";
export const layDanhSachCategories = () => {
  return async (dispatch) => {
    await firestore
      .collection("categories")
      .get()
      .then((querySnapshot) => {
        const categoryArray = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            _id: doc.id,
          };
        });
        dispatch({
          type: categoryTypes.FETCH_ALL_CATEGORIES,
          payload: categoryArray,
        });
      });
  };
};

export const nguoiDungXoaCategory = (id, resetForm) => {
  return async (dispatch) => {
    try {
      swal({
        title: "Bạn chắc chứ?",
        text: "Người dùng đã xóa không thể khôi phục lại!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await firestore
            .collection("categories")
            .doc(id)
            .delete()
            .then(() => {
              dispatch({
                type: categoryTypes.DELETE_CATEGORY,
              });
              dispatch(layDanhSachCategories());
              swal("Thành công", "Xoá thành công", "success");
              resetForm();
            })
            .catch((error) => {
              swal("Thất bại", "Xoá dữ liệu thất bại", "warning");
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const nguoiDungThemCategory = (categoryName, resetForm) => {
  return async (dispatch) => {
    try {
      const timestamp = new Date();
      await firestore
        .collection("categories")
        .doc()
        .set({
          name: categoryName,
          createdAt: timestamp,
        })
        .then(() => {
          dispatch({
            type: categoryTypes.ADD_NEW_CATEGORY,
          });
          dispatch(layDanhSachCategories());
          resetForm();
          swal("Thành công", "Thêm dữ liệu thành công", "success");
        })
        .catch((error) => {
          swal("Thất bại", "Thêm dữ liệu thất bại", "warning");
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const nguoiDungSuaCategory = (categoryValue, resetForm) => {
  return async (dispatch) => {
    try {
      const timestamp = new Date();
      console.log(categoryValue);
      await firestore
        .collection("categories")
        .doc(categoryValue.id)
        .set({
          name: categoryValue.category,
          createdAt: timestamp,
        })
        .then(() => {
          dispatch({
            type: categoryTypes.ADD_NEW_CATEGORY,
          });
          dispatch(layDanhSachCategories());
          resetForm();
          swal("Thành công", "Sửa dữ liệu thành công", "success");
        })
        .catch((error) => {
          swal("Thất bại", "Sửa dữ liệu thất bại", "warning");
        });
    } catch (error) {
      console.log(error);
    }
  };
};
