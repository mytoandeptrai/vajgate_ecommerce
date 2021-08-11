import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { layChiTietOrder } from "../../Redux/Orders/order.actions";
import loadingimage from "./loading.gif";
import "./style.css";
const HistoryDetails = () => {
  const { orderId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layChiTietOrder(orderId));
  }, [orderId]);

  const orderDetails = useSelector((state) => state.ordersData.orderDetails);
  const isLoadingDetails = useSelector(
    (state) => state.ordersData.isLoadingDetails
  );

  const renderOrderDetails = () => {
    return (
      <>
        <div className="details-history">
          <div className="container">
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
                  <td>{orderDetails.name}</td>
                  <td>{orderDetails.address}</td>
                  <td>{orderDetails.phone}</td>
                  <td>{String(orderDetails.payment).toUpperCase()}</td>
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
                  {orderDetails.cartItems.map((product, index) => {
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
                      Total: {orderDetails.total} $
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
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {isLoadingDetails === false &&
      Object.entries(orderDetails).length !== 0 ? (
        <>{renderOrderDetails()}</>
      ) : (
        <>
          <div className="loadingDetails">
            <div className="loading-image">
              <img src={loadingimage} alt="loading-img" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HistoryDetails;
