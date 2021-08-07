import React from "react";
import "./style.css";
const LoadMore = ({ isVisible, products, handleLoadMore }) => {
  return (
    <>
      {isVisible < products?.length && (
        <>
          <div className="load-more" onClick={handleLoadMore}>
            Load More
            <i className="fas fa-sort-down"></i>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default LoadMore;
