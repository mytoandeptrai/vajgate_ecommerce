import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Modal = ({
  isAdmin,
  openModal,
  closeModal,
  product,
  day,
  handleAddToCart,
}) => {
  return (
    <>
      <div className={openModal ? "modal modal-show" : "modal"}>
        <div className="modal-content">
          <div className="btn-close-modal" onClick={closeModal}>
            &times;
          </div>
          <div className="modal-detail">
            {/* <div className="modal-detail-image"> */}
            <img
              src={product.images}
              alt="product-item"
              className="modal-img"
            />
            {/* </div> */}

            <div className="modal-info">
              <h2 className="modal-name">
                <Link to={`/detail/${product._id}`}>{product.name}</Link>
              </h2>
              <p className="modal-price">$ {product.price} / 1h</p>
              <ul className="modal-list">
                <li>
                  <span>Japan Name: {product.japanName}</span>
                </li>
                <li>
                  <span>
                    Size: {product.bust}, {product.waist}, {product.hip}
                  </span>
                </li>
                <li>
                  <span>Height: {product.height} cm</span>
                </li>
                <li>
                  <span>Blood Type: {product.blood_type}</span>
                </li>
                <li>
                  <span>Birthday: {day}</span>
                </li>
                <li>
                  <span>Hobby: {product.hobby}</span>
                </li>
              </ul>

              {isAdmin ? (
                <div
                  className="product_admin-btn"
                  style={{ marginTop: "50px" }}
                >
                  <div
                    className="product_admin-delete"
                    // onClick={() =>
                    //   deleteProduct(product._id, product.images.public_id)
                    // }
                  >
                    Delete
                  </div>
                  <div className="product_admin-edit">
                    <Link
                      to={`/product/edit/${product._id}`}
                      style={{ color: "white" }}
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ) : (
                <div
                  className="card_btn-addtocart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </div>
              )}

              <div className="btn-sharebox">
                Share:
                <span>
                  <i className="fab fa-facebook-f"></i>
                </span>
                <span>
                  <i className="fab fa-instagram"></i>
                </span>
                <span>
                  <i className="fab fa-twitter"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
