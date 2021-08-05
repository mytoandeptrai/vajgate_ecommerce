import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoriesList from "../../Components/CategoryList";
import {
  layDanhSachCategories,
  nguoiDungSuaCategory,
  nguoiDungThemCategory,
  nguoiDungXoaCategory,
} from "../../Redux/Categories/categories.actions";
import "./style.css";
const QuanLyTheLoai = () => {
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesData.categories);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(layDanhSachCategories());
  }, []);

  const resetForm = () => {
    setCategory("");
  };

  const onHanldeSubmit = (e) => {
    e.preventDefault();
    if (onEdit) {
      const categoryConfig = {
        id,
        category,
      };
      dispatch(nguoiDungSuaCategory(categoryConfig, resetForm));
    } else {
      dispatch(nguoiDungThemCategory(category, resetForm));
    }
  };

  const editCategory = (id, name) => {
    setOnEdit(true);
    setId(id);
    setCategory(name);
  };

  const deleteCategory = (id) => {
    dispatch(nguoiDungXoaCategory(id, resetForm));
  };

  return (
    <>
      <div className="categories">
        <div className="container">
          <div className="categories-body">
            <div className="categories-form">
              <form onSubmit={onHanldeSubmit}>
                <label htmlFor="category" className="categories-label">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="categories-input"
                  value={category}
                  required
                  onChange={(e) => setCategory(e.target.value)}
                />
                <button
                  type="submit"
                  className="categories-button"
                  style={{ width: "80px" }}
                >
                  {onEdit ? "Update" : "Save"}
                </button>
              </form>
            </div>

            <CategoriesList
              categories={categories}
              deleteCategory={deleteCategory}
              editCategory={editCategory}
            />
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default QuanLyTheLoai;
