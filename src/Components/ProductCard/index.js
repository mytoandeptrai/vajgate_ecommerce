import React from "react";
import "./style.css";
import loadingimage from "./loading.gif";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import ProductCardItem from "./ProductCardItem";
const ProductCard = ({ product, isLoadingDetail, isAdmin }) => {
  return (
    <>
      {isLoadingDetail === true ? (
        <>
          <div className="loadingDetails">
            <div className="loading-image">
              <img src={loadingimage} alt="loading-img" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="card-product">
              <div className="card__title">
                <Link to="/" className="icon">
                  <i className="fa fa-arrow-left"></i>
                </Link>
                <h3 style={{ marginLeft: "20px" }}>{product.category}</h3>
              </div>

              <div className="card__body">
                <ProductCardItem product={product} />
              </div>

              <div className="indicator"></div>
              <div className="card__bottom">
                <Link to="/">VAJGATE</Link>
                {isAdmin ? (
                  <div className="product_admin-btn">
                    {/* <div className="product_admin-delete">Delete</div>🐊🚀 */}
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
                    // onClick={() => addCart(product)}
                  >
                    Add To Cart
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductCard;
