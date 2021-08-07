import dayjs from "dayjs";
import React from "react";
import "./style.css";
const ProductCardItem = ({ product }) => {
  return (
    <>
      <div className="card__body-left">
        {product?.images ? (
          <img src={product?.images} alt="product-detail" />
        ) : (
          ""
        )}
      </div>

      <div className="card__body-right">
        <h2 className="modal-name">{product?.name}</h2>
        <p className="modal-price">$ {product?.price} / 1h</p>
        <ul className="modal-list">
          <li>
            <span>Japan Name: {product?.japanName}</span>
          </li>
          <li>
            <span>
              Size: {product?.bust}, {product?.waist}, {product?.hip}
            </span>
          </li>
          <li>
            <span>Height: {product?.height} cm</span>
          </li>
          <li>
            <span>Blood Type: {product?.blood_type}</span>
          </li>
          <li>
            <span>
              Birthday: {dayjs(product?.birthday).format("DD-MM-YYYY")}
            </span>
          </li>
          <li>
            <span>Hobby: {product?.hobby}</span>
          </li>
          <span className="stock"> In stock</span>
          <div className="reviews">
            <ul className="stars">
              <li>
                <i className="fa fa-star"></i>
              </li>
              <li>
                <i className="fa fa-star"></i>
              </li>
              <li>
                <i className="fa fa-star"></i>
              </li>
              <li>
                <i className="fa fa-star"></i>
              </li>
              <li>
                <i className="far fa-star"></i>
              </li>
            </ul>
            <span>(64 reviews)</span>
          </div>
        </ul>
        <div className="detail_product-rented">
          Rented: {product?.rented} times
        </div>
      </div>
    </>
  );
};

export default ProductCardItem;
