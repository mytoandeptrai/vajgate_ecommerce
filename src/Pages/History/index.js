import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  layOrderNguoiDung,
  layToanBoOrderAction,
} from "../../Redux/Orders/order.actions";
import "./style.css";
const Hisory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const currentUser = useSelector((state) => state.usersData.currentUser);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layOrderNguoiDung(currentUser.userId));
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?.maLoaiNguoiDung === "QuanTri") {
      setIsAdmin(true);
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(layToanBoOrderAction());
  }, []);

  const orderHistory = useSelector((state) => state.ordersData.orderHistory);
  const orders = useSelector((state) => state.ordersData.orders);

  const renderHistoryAdmin = () => {
    return (
      <>
        {orders.map((payment, index) => {
          return (
            <tr key={index}>
              <td>{payment._id}</td>
              <td>{new Date(payment.orderDate).toLocaleDateString()}</td>
              <td>
                {payment.isProcessing === false ? "Processing" : "is Shipping"}
              </td>
              <td style={{ textAlign: "center" }}>
                <Link to={`/history/${payment._id}`}>View</Link>
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  const renderHistoryUser = () => {
    return (
      <>
        {orderHistory.map((payment, index) => {
          return (
            <tr key={index}>
              <td>{payment._id}</td>
              <td>{new Date(payment.orderDate).toLocaleDateString()}</td>
              <td>
                {payment.isProcessing === false ? "Processing" : "is Shipping"}
              </td>
              <td style={{ textAlign: "center" }}>
                <Link to={`/history/${payment._id}`}>View</Link>
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="history">
        <div className="container">
          {orderHistory.length === 0 ? (
            <>
              {" "}
              <h2 style={{ marginBottom: "300px" }}>
                History Clear
                <Link to="/" className="cart-to-home">
                  <i
                    className="fas fa-long-arrow-alt-left"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Go Back To Shopping
                </Link>
              </h2>
            </>
          ) : (
            <>
              {" "}
              <div>
                <div className="history-header">
                  <h2>History</h2>
                  <span className="history-label">
                    {isAdmin ? "Your shop has" : "You have"}
                    <span className="history-length">
                      {isAdmin ? orders.length : orderHistory.length}
                    </span>{" "}
                    ordered
                  </span>
                </div>

                <table className="table table-bordered sm-table">
                  <thead>
                    <tr>
                      <th scope="col">Payment ID</th>
                      <th scope="col">Date Of Purchased</th>
                      <th scope="col">Status</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isAdmin === true
                      ? renderHistoryAdmin()
                      : renderHistoryUser()}
                  </tbody>
                </table>
              </div>{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Hisory;
