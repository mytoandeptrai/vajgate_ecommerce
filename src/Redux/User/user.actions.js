import swal from "sweetalert";
import { auth, firestore } from "../../Utilities/firebase/utils";
import userTypes from "./user.types";

export const nguoiDungDangKyAction = (userRegister, history) => {
  console.log(userRegister);
  const { email, matKhau, hoTen, soDT, maLoaiNguoiDung } = userRegister;
  return async (dispatch) => {
    try {
      await auth
        .createUserWithEmailAndPassword(email, matKhau)
        .then(async (userCredential) => {
          const { uid } = userCredential.user;
          //check user in collection
          const userRef = firestore.doc(`users/${uid}`);
          const snapshot = await userRef.get();
          if (!snapshot.exists) {
            const { displayName, email } = userCredential.user;
            const defaultImage =
              "https://graph.facebook.com/491658451867422/picture";
            const timestamp = new Date();
            try {
              await userRef.set({
                displayName,
                email,
                createdAt: timestamp,
                image: defaultImage,
                hoTen,
                maLoaiNguoiDung,
                soDt: soDT,
              });
            } catch (error) {
              console.log(error);
            }
          }
        })
        .then(() => {
          dispatch({
            type: userTypes.USER_SIGNUP_SUCCESS,
            payload: true,
          });
          swal("Thành công", "bạn đăng ký thành công", "success");
          history.push("/");
        })
        .catch((error) => {
          swal("Thất bại", `${error.message}`, "warning");
        });
    } catch (error) {
      dispatch({
        type: userTypes.USER_SIGNUP_FAILED,
        payload: error.message,
      });
    }
  };
};

export const nguoiDungDangNhapAction = (userLogin, history) => {
  return async (dispatch) => {
    try {
      const { email, matKhau } = userLogin;
      await auth
        .signInWithEmailAndPassword(email, matKhau)
        .then(() => {
          dispatch({
            type: userTypes.USER_LOGIN_SUCCESS,
            payload: true,
          });
          swal("Thành công", "bạn đăng nhập thành công", "success");
          history.push("/");
        })
        .catch((error) => {
          swal("Thất bại", `${error.message}`, "warning");
        });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const nguoiDungLayLaiMatKhauAction = ({ email }) => {
  return async (dispatch) => {
    try {
      const configUrl = {
        url: "http://localhost:3000/login",
      };
      await auth
        .sendPasswordResetEmail(email, configUrl)
        .then(() => {
          swal(
            "Thành công",
            "bạn vui lòng kiểm tra hộp thư trong email để xác nhận và đăng nhập",
            "success"
          );
        })
        .catch((error) => {
          swal(
            "Thất bại",
            "Email không được tìm thấy,vui lòng thử lại !",
            "warning"
          );
        });
    } catch (error) {
      console.log(error.message);
    }
  };
};
