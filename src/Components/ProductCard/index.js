import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cartTypes from "../../Redux/Cart/cart.types";
import ProductItem from "../AllProducts/ProductItem";
import loadingimage from "./loading.gif";
import ProductCardItem from "./ProductCardItem";
import "./style.css";
const ProductCard = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const isLoadingDetail = useSelector(
    (state) => state.productsData.isLoadingDetail
  );
  const product = useSelector((state) => state.productsData.product);
  const productRelative = useSelector(
    (state) => state.productsData.productRelative
  );

  const productRelatived = productRelative?.filter(
    (el) => el._id !== product._id
  );

  const handleAddToCart = (cartItem) => {
    dispatch({
      type: cartTypes.ADD_TO_CART,
      payload: cartItem,
    });
  };
  return (
    <>
      {isLoadingDetail === true && Object.entries(product).length === 0 ? (
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
                <h3 style={{ marginLeft: "20px" }}>{product?.category}</h3>
              </div>

              <div className="card__body">
                <ProductCardItem product={product} />
              </div>

              <div className="indicator"></div>
              <div className="card__bottom">
                <Link to="/">VAJGATE!</Link>
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
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </div>
                )}
              </div>
            </div>
            <div className="related-products">
              <h2>Related products</h2>
              <div className="row">
                {productRelatived?.map((product, index) => (
                  <ProductItem product={product} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductCard;
