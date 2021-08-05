import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import loginImg from "./login-img.jpg";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import swal from "sweetalert";
// thư viện formik
import { withFormik, Form, Field } from "formik";
//Thư viện yub (validate form)
import * as yup from "yup";
import "./style.css";
import { nguoiDungDangKyAction } from "../../Redux/User/user.actions";
const DangKy = (formikProps) => {
  const currentUser = useSelector((state) => state.usersData.currentUser);

  useEffect(() => {
    if (currentUser !== null) {
      history.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(nguoiDungDangKyAction(formikProps.values, history));
  };

  return (
    <>
      <div className="login register">
        <div className="login-img">
          <img src={loginImg} alt="login-img"></img>
        </div>
        <Form className="form-login" onSubmit={handleSubmit}>
          <Typography variant="headline" gutterBottom className="form_title">
            Đăng ký để được thuê mấy em xinh tươi !
          </Typography>
          <FormControl
            fullWidth
            margin="normal"
            error={
              formikProps.touched.taiKhoan && !!formikProps.errors.taiKhoan
            }
          >
            <InputLabel>Tài khoản</InputLabel>
            <Field
              name="taiKhoan"
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  value={formikProps.values.taiKhoan}
                  onChange={formikProps.handleChange}
                />
              )}
            />
            {formikProps.touched.taiKhoan && (
              <FormHelperText>{formikProps.errors.taiKhoan}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            error={formikProps.touched.hoTen && !!formikProps.errors.hoTen}
          >
            <InputLabel>Họ tên</InputLabel>
            <Field
              name="hoTen"
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  name="hoTen"
                  value={formikProps.values.hoTen}
                  onChange={formikProps.handleChange}
                />
              )}
            />
            {formikProps.touched.hoTen && (
              <FormHelperText>{formikProps.errors.hoTen}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            error={formikProps.touched.email && !!formikProps.errors.email}
          >
            <InputLabel>Email</InputLabel>
            <Field
              name="email"
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  name="email"
                  value={formikProps.values.email}
                  onChange={formikProps.handleChange}
                />
              )}
            />
            {formikProps.touched.email && (
              <FormHelperText>{formikProps.errors.email}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            error={formikProps.touched.matKhau && !!formikProps.errors.matKhau}
          >
            <InputLabel>Mật khẩu</InputLabel>
            <Field
              name="matKhau"
              render={({ field }) => (
                <Input
                  fullWidth
                  type="password"
                  {...field}
                  name="matKhau"
                  value={formikProps.values.matKhau}
                  onChange={formikProps.handleChange}
                />
              )}
            />
            {formikProps.touched.matKhau && (
              <FormHelperText>{formikProps.errors.matKhau}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            error={formikProps.touched.soDT && !!formikProps.errors.soDT}
          >
            <InputLabel>Số điện thoại</InputLabel>
            <Field
              name="soDT"
              render={({ field }) => (
                <Input
                  fullWidth
                  type="phoneNumber"
                  {...field}
                  name="soDT"
                  value={formikProps.values.soDT}
                  onChange={formikProps.handleChange}
                />
              )}
            />
            {formikProps.touched.soDT && (
              <FormHelperText>{formikProps.errors.soDT}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <button className="btn btn-danger p-2" type="submit">
              Đăng ký
            </button>
          </FormControl>
          <p>
            Bạn đã có tài khoản? <NavLink to="/login">Đăng nhập</NavLink>
          </p>
        </Form>
      </div>
    </>
  );
};

const FormikForm = withFormik({
  mapPropsToValues() {
    // Init form field
    return {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maLoaiNguoiDung: "KhachHang",
      email: "",
    };
  },
  validationSchema: yup.object().shape({
    // Validate form field
    taiKhoan: yup
      .string()
      .required("Tài khoản không được bỏ trống")
      .min(5, "Tài khoản có ít nhất 5 ký tự"),
    email: yup
      .string()
      .required("Email không được bỏ trống")
      .email("Email không hợp lệ"),
    hoTen: yup
      .string()
      .required("Họ tên không được bỏ trống")
      .min(8, "Họ tên có ít nhất 8 ký tự"),
    soDT: yup.string().required("Số điện thoại không được bỏ trống"),
    matKhau: yup
      .string()
      .required("Mật khẩu không được bỏ trống")
      .min(8, "Mật khẩu có ít nhất 8 ký tự"),
  }),
})(DangKy);

export default FormikForm;
