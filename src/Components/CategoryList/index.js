import React from "react";

const CategoriesList = ({ categories, editCategory, deleteCategory }) => {
  return (
    <>
      <div className="categories-list">
        {categories &&
          categories.map((category) => {
            return (
              <div key={category._id} className="categories-item">
                <div className="categories-item-name">{category.name}</div>
                <div>
                  <button
                    className="categories-button"
                    style={{ marginRight: "10px" }}
                    onClick={() => editCategory(category._id, category.name)}
                  >
                    Edit
                  </button>
                  <button
                    className="categories-button"
                    onClick={() => deleteCategory(category._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CategoriesList;
