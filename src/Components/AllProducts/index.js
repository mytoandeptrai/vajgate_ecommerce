import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layToanBoProductAction } from "../../Redux/Products/products.actions";
import productTypes from "../../Redux/Products/products.types";
import Filter from "../Filter";
import LoadMore from "./LoadMore";
import ProductItem from "./ProductItem";
import "./style.css";
const AllProducts = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [queryInput, setQueryInput] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [isVisible, setIsVisible] = useState(6);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(layToanBoProductAction(category));
  }, [category]);

  const products = useSelector((state) => state.productsData.products);

  const productFilter = useSelector(
    (state) => state.productsData.productFilter
  );
  const isFilter = useSelector((state) => state.productsData.isFilter);

  if (products.length === 0) {
    var styleProducts = {
      marginBottom: "1000px",
    };
  }

  const handleLoadMore = () => {
    setIsVisible((prevValue) => prevValue + 3);
  };

  const handleCategory = (e) => {
    const targets = document.querySelectorAll("li.filter-category");

    for (let i = 0; i < targets.length; i++) {
      if (targets[i].getAttribute("value") === e.target.getAttribute("value")) {
        targets[i].classList.add("active");
      } else {
        targets[i].classList.remove("active");
      }
    }
    if (e.target.getAttribute("value")) {
      setCategory(e.target.getAttribute("value"));
    }
  };

  const handleSearch = (productsItem) => {
    return productsItem.filter((products) => {
      if (queryInput === "") {
        return products;
      } else if (
        products.name.toLowerCase().includes(queryInput.toLowerCase())
      ) {
        return products;
      }
    });
  };

  const handleSort = (e) => {
    const targets = document.querySelectorAll("li.filter-sort-item");
    for (let i = 0; i < targets.length; i++) {
      if (targets[i].getAttribute("value") === e.target.getAttribute("value")) {
        targets[i].classList.add("active");
      } else {
        targets[i].classList.remove("active");
      }
    }

    if (e.target.getAttribute("value")) {
      const valueSorting = e.target.getAttribute("value");
      setSortValue(e.target.getAttribute("value"));
      dispatch({
        type: productTypes.SORT_PRODUCT_BY_PRICE,
        payload: valueSorting,
      });
    }
  };

  let data = isFilter === true ? productFilter : products;
  return (
    <>
      <div className="container" style={styleProducts}>
        <Filter
          handleCategory={handleCategory}
          queryInput={queryInput}
          setQueryInput={setQueryInput}
          sortValue={sortValue}
          handleSort={handleSort}
        />
        <div className="row">
          {data.length === 0 ? (
            <div className="loading-products"> loading...</div>
          ) : (
            handleSearch(data.slice(0, isVisible)).map((product, index) => {
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
