import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachCategories } from "../../Redux/Categories/categories.actions";
import { layToanBoProductAction } from "../../Redux/Products/products.actions";
import Filter from "../Filter";
import LoadMore from "./LoadMore";
import ProductItem from "./ProductItem";
import "./style.css";
const AllProducts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(layToanBoProductAction());
  }, []);

  const products = useSelector((state) => state.productsData.products);

  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(6);

  if (products.length === 0) {
    var styleProducts = {
      marginBottom: "1000px",
    };
  }

  const handleLoadMore = () => {
    setIsVisible((prevValue) => prevValue + 3);
  };

  return (
    <>
      <div className="container" style={styleProducts}>
        <Filter />
        <div className="row">
          {products.length === 0 ? (
            <div className="loading-products"> loading...</div>
          ) : (
            products.slice(0, isVisible).map((product, index) => {
              return (
                <ProductItem
                  product={product}
                  key={index}
                  // isAdmin={isAdmin}
                  // deleteProduct={deleteProduct}
                  // handleCheckProduct={handleCheckProduct}
                />
              );
            })
          )}
        </div>
        <LoadMore
          isVisible={isVisible}
          products={products}
          handleLoadMore={handleLoadMore}
        />
      </div>
    </>
  );
};

export default AllProducts;
