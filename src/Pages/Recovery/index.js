import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import loginImg1 from "./login-1.jpeg";
// thư viện formik
import { Field, Form, withFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
//Thư viện yub (validate form)
import * as yup from "yup";
import { nguoiDungLayLaiMatKhauAction } from "../../Redux/User/user.actions";

const Recovery = (formikProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(nguoiDungLayLaiMatKhauAction(formikProps.values)).then(() =>
      history.push("/login")
    );
  };
  return (
    <>
      <div className="login register">
        <div className="login-img">
          <img src={loginImg1} alt="login-img"></img>
        </div>
        <Form className="form-login" onSubmit={handleSubmit}>
          <Typography variant="headline" gutterBottom className="form_title">
            Làm gì mà phải để mất mật khẩu rồi cơ ?
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

          <FormControl fullWidth margin="normal">
            <button className="btn btn-danger p-2" type="submit">
              Gửi
            </button>
          </FormControl>
          <p>
            Bạn chưa có tài khoản? <NavLink to="/register">Đăng ký</NavLink>
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
    };
  },
  validationSchema: yup.object().shape({
    // Validate form field
    email: yup
      .string()
      .required("Email không được bỏ trống")
      .email("Email không hợp lệ"),
  }),
})(Recovery);

export default FormikForm;
