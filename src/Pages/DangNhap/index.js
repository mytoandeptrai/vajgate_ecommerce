import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
// thư viện formik
import { Field, Form, withFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
//Thư viện yub (validate form)
import * as yup from "yup";
import { nguoiDungDangNhapAction } from "../../Redux/User/user.actions";
import loginImg1 from "./login-1.png";
import "./style.css";
const DangNhap = (formikProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const currentUser = useSelector((state) => state.usersData.currentUser);

  // useEffect(() => {
  //   if (currentUser !== null) {
  //     history.push("/");
  //   }
  // }, [currentUser]);

  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(nguoiDungDangNhapAction(formikProps.values, history));
  };

  return (
    <>
      <div className="login register">
        <div className="login-img">
          <img src={loginImg1} alt="login-img"></img>
        </div>
        <Form className="form-login" onSubmit={handleSubmit}>
          <Typography variant="headline" gutterBottom className="form_title">
            Đăng nhập mau chứ em xinh tươi đang đợi !
          </Typography>

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

          <FormControl fullWidth margin="normal">
            <button className="btn btn-danger p-2" type="submit">
              Đăng nhập
            </button>
          </FormControl>
          <p>
            Bạn chưa có tài khoản? <NavLink to="/register">Đăng ký</NavLink>
          </p>
          <p>
            <NavLink to="/recovery">Quên mật khẩu ?</NavLink>
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
      email: "",
      matKhau: "",
    };
  },
  validationSchema: yup.object().shape({
    // Validate form field
    email: yup
      .string()
      .required("Email không được bỏ trống")
      .email("Email không hợp lệ"),
    matKhau: yup
      .string()
      .required("Mật khẩu không được bỏ trống")
      .min(8, "Mật khẩu có ít nhất 8 ký tự"),
  }),
})(DangNhap);

export default FormikForm;
