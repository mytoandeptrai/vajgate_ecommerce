import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./style.css";
const HistoryDetails = () => {
  const { orderId } = useParams();
  const orderHistory = useSelector((state) => state.ordersData.orderHistory);
  const orderDetails = orderHistory.filter((order) => order._id === orderId);
  if (orderDetails.length === 0) return null;
  return (
    <>
      {" "}
      <div className="detail-history">
        <div className="container">
          {orderDetails.map((order) => {
            return (
              <>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Kind of Payments</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{order.name}</td>
                      <td>{order.address}</td>
                      <td>{order.phone}</td>
                      <td>{String(order.payment).toUpperCase()}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="detail-history-cart">
                  <table className="table table-bordered detail-tabel detail-tabel-sm">
                    <thead>
                      <tr>
                        <th scope="col">Thumbnail</th>
                        <th scope="col">Products</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItems.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ textAlign: "center" }}>
                              <img
                                src={product.images}
                                alt="history_image"
                                className="detail-history-cart-img"
                              ></img>
                            </td>
                            <td
                              style={{
                                textTransform: "uppercase",
                                fontWeight: "500",
                              }}
                            >
                              {product.name}
                            </td>
                            <td>{product.quantity} h</td>
                            <td>{product.price} $</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td
                          style={{
                            fontWeight: "bold",
                            fontSize: "18px",
                            padding: "20px",
                          }}
                          className="dt-ht-sm-total"
                        >
                          Total: {order.total} $
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <Link to="/history" className="cart-to-home">
                    <i
                      className="fas fa-long-arrow-alt-left"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Go Back To History
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HistoryDetails;
