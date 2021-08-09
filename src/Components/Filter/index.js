import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachCategories } from "../../Redux/Categories/categories.actions";
import "./style.css";
const Filter = ({
  handleCategory,
  queryInput,
  setQueryInput,
  sortValue,
  handleSort,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachCategories());
  }, []);

  const categories = useSelector((state) => state.categoriesData.categories);

  return (
    <>
      <div className="filter">
        <div className="filter-left">
          <ul>
            <li
              value="All"
              className="filter-category active"
              onClick={handleCategory}
            >
              All
            </li>
            {categories.map((category) => {
              return (
                <li
                  className="filter-category"
                  key={category._id}
                  value={category.name}
                  onClick={handleCategory}
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="filter-right">
          <div>
            <input
              className="filter-input"
              onChange={(e) => setQueryInput(e.target.value)}
              value={queryInput}
              placeholder="Search Name..."
            />
          </div>

          <div className="filter-lable">
            Filter
            <i className="fas fa-sort-down"></i>
            <div className="filter-sort">
              <h3>SORT BY</h3>
              <ul>
                <li
                  className="filter-sort-item active"
                  value="default"
                  onClick={handleSort}
                >
                  Default
                </li>
                <li
                  className="filter-sort-item"
                  value="Rented"
                  onClick={handleSort}
                >
                  Popularity
                </li>
                {/* <li
                  className="filter-sort-item"
                  value="createdAt"
                  onClick={handleSort}
                >
                  Newness
                </li> */}
                <li
                  className="filter-sort-item"
                  value="Lowest"
                  onClick={handleSort}
                >
                  Price: Low to High
                </li>
                <li
                  className="filter-sort-item"
                  value="Highest"
                  onClick={handleSort}
                >
                  Price: High to Low
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
