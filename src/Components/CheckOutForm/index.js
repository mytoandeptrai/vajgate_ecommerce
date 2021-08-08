import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { themOrderAction } from "../../Redux/Orders/order.actions";
import "./style.css";
import emailjs from "emailjs-com";
import swal from "sweetalert";
const CheckOutForm = ({ total, cartItems, setStep }) => {
  const initialValues = {
    name: "",
    email: "",
    address: "",
    phone: "",
    payment: "",
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    // Validate form field
    name: Yup.string().required("Không được bỏ trống"),
    email: Yup.string().required("Không được bỏ trống").email("Không hợp lệ"),
    address: Yup.string()
      .required("Không được bỏ trống")
      .min(12, "Có ít nhất 12 ký tự"),
    phone: Yup.string()
      .required("Không được bỏ trống")
      .matches(phoneRegExp, "Phone number is not valid"),
    payment: Yup.string().required("Vui lòng chọn phương thức giao hàng"),
  });

  const currentUser = useSelector((state) => state.usersData.currentUser);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const sendEmail = (email, data) => {
    let templateParams = {
      from_name: "VAJGATE Store",
      to_name: email,
      message: data,
    };
    try {
      emailjs.send(
        "service_ag5s9pa",
        "template_drtx4me",
        templateParams,
        "user_xIM0XRWJlXjbCTUs0eRDH"
      );
      resetForm();
      swal(
        "Đặt Hàng Thành Công! Kiểm tra email của bạn để xem thông tin đơn hàng",
        "",
        "success"
      );
    } catch (err) {
      swal(`${err}`, "", "error");
    }
  };

  const resetForm = () => {
    setEmail("");
  };

  return (
    <>
      <div className="cart-payment">
        <h2>INFORMATION SHIPPING</h2>
        <div className="form-paymet">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              const timestamp = new Date().toISOString();
              const configOrder = {
                address: values.address,
                email: values.email,
                name: values.name,
                payment: values.payment,
                phone: values.phone,
                cartItems,
                isProcessing: false,
                total,
                orderUserId: currentUser.userId,
                orderDate: timestamp,
              };
              const paymentDetails = {
                info: values,
                total: total,
              };
              console.log(configOrder);
              dispatch(themOrderAction(configOrder));
              resetForm();
              sendEmail(values.email, JSON.stringify(paymentDetails));
            }}
          >
            {(formilkProps) => {
              let { values, errors, touched } = formilkProps;
              return (
                <Form>
                  <div className="form-group">
                    <input
                      class="form-control"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      onChange={formilkProps.handleChange}
                      onBlur={formilkProps.handleBlur}
                      value={formilkProps.values.name}
                    />
                    {formilkProps.touched.name && formilkProps.errors.name ? (
                      <FormHelperText className="error-message">
                        {formilkProps.errors.name}
                      </FormHelperText>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <input
                      class="form-control"
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Email"
                      onChange={formilkProps.handleChange}
                      onBlur={formilkProps.handleBlur}
                      value={formilkProps.values.email}
                    />
                    {formilkProps.touched.email && formilkProps.errors.email ? (
                      <FormHelperText className="error-message">
                        {formilkProps.errors.email}
                      </FormHelperText>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <input
                      class="form-control"
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Phone"
                      onChange={formilkProps.handleChange}
                      onBlur={formilkProps.handleBlur}
                      value={formilkProps.values.phone}
                    />
                    {formilkProps.touched.phone && formilkProps.errors.phone ? (
                      <FormHelperText className="error-message">
                        {formilkProps.errors.phone}
                      </FormHelperText>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <input
                      class="form-control"
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Address"
                      onChange={formilkProps.handleChange}
                      onBlur={formilkProps.handleBlur}
                      value={formilkProps.values.address}
                    />
                    {formilkProps.touched.address &&
                    formilkProps.errors.address ? (
                      <FormHelperText className="error-message">
                        {formilkProps.errors.address}
                      </FormHelperText>
                    ) : null}
                  </div>

                  <div className="form-group ">
                    <select
                      className="form-control"
                      name="payment"
                      value={formilkProps.values.payment}
                      onChange={formilkProps.handleChange}
                      onBlur={formilkProps.handleBlur}
                      style={{ display: "block" }}
                    >
                      <option>Select your type of payments</option>
                      <option value="cod">Payment on delivery</option>
                      <option value="bank">Banking</option>
                    </select>
                    {formilkProps.touched.payment &&
                    formilkProps.errors.payment ? (
                      <FormHelperText className="error-message">
                        {formilkProps.errors.payment}
                      </FormHelperText>
                    ) : null}

                    <div>
                      {formilkProps.values.payment === "bank" ? (
                        <div className="border p-5 details-banking">
                          <h4>Chủ Tài khoản : Trần Phước Mỹ Toàn</h4>
                          <p> STK : 16868686868 </p>
                          <p>
                            Ngân hàng Vietcombank - Chi nhánh Hải Châu Đà Nẵng
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="btns-form">
                    <Button onClick={() => setStep(1)}>Back</Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn-checkout"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <div className="cart-total">
            <div className="cart-total-label">total</div>
            <div className="cart-total-number">${total}.00</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutForm;
