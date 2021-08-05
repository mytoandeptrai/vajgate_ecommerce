import Tooltip from "@material-ui/core/Tooltip";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { layDanhSachCategories } from "../../Redux/Categories/categories.actions";
import { themSanPhamAction } from "../../Redux/Products/products.actions";
import "./style.css";
const QuanLySanPham = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(layDanhSachCategories());
  }, []);

  var initialState = {
    product_id: "",
    name: "",
    japanName: "",
    bust: 0,
    waist: 0,
    hip: 0,
    height: 0,
    blood_type: "",
    birthday: Date(),
    hobby: "",
    price: 0,
    category: "",
    images: "",
  };
  const categories = useSelector((state) => state.categoriesData.categories);

  const [productData, setProductData] = useState(initialState);
  const [startdate, setStartDate] = useState(new Date());
  const [onEdit, setOnEdit] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const resetForm = () => {
    setProductData({
      product_id: "",
      name: "",
      japanName: "",
      bust: 0,
      waist: 0,
      hip: 0,
      height: 0,
      blood_type: "",
      birthday: Date(),
      hobby: "",
      price: 0,
      category: "",
      images: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onEdit) {
      return;
    } else {
      dispatch(themSanPhamAction(productData, resetForm));
    }
  };

  const onHandleChange = (e) => {
    let targets = e.target;
    let name = targets.name;
    let value = targets.value;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  console.log(productData);

  let styleImaheUpload = {
    display: productData.images ? "block" : "none",
  };

  const handleDestroyImage = () => {
    setProductData({
      ...productData,
      images: "",
    });
  };

  return (
    <>
      <div className="create-product container">
        <div className="cp-image-upload-box">
          <FileBase64
            accept="image/*"
            multiple={false}
            type="file"
            value={productData.images}
            onDone={({ base64 }) =>
              setProductData({ ...productData, images: base64 })
            }
          />
          <img
            className="cp-image-upload"
            style={styleImaheUpload}
            alt="img-upload"
            src={productData.images ? productData.images : ""}
          />
          {productData.images ? (
            <Tooltip title="Delete Image" placement="top">
              <span className="cp-image-button" onClick={handleDestroyImage}>
                X
              </span>
            </Tooltip>
          ) : (
            ""
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="product_id" className="form-label">
              Product ID
            </label>
            <input
              type="text"
              className="form-control"
              onChange={onHandleChange}
              disabled={onEdit ? true : false}
              value={productData.product_id}
              id="product_id"
              name="product_id"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={onHandleChange}
              value={productData.name}
              id="name"
              name="name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="japanName" className="form-label">
              Japan Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={onHandleChange}
              value={productData.japanName}
              id="japanName"
              name="japanName"
              required
            />
          </div>
          <div style={{ display: "flex" }}>
            <div className="mb-3 mr-3">
              <label htmlFor="bust" className="form-label">
                Bust
              </label>
              <input
                type="number"
                className="form-control"
                onChange={onHandleChange}
                value={productData.bust}
                id="bust"
                name="bust"
                required
              />
            </div>
            <div className="mb-3 mr-3">
              <label htmlFor="waist" className="form-label">
                Waist
              </label>
              <input
                type="number"
                className="form-control"
                onChange={onHandleChange}
                value={productData.waist}
                id="waist"
                name="waist"
                required
              />
            </div>
            <div className="mb-3 mr-3">
              <label htmlFor="hip" className="form-label">
                Hip
              </label>
              <input
                type="number"
                className="form-control"
                onChange={onHandleChange}
                value={productData.hip}
                id="hip"
                name="hip"
                required
              />
            </div>
            <div className="mb-3 mr-3">
              <label htmlFor="height" className="form-label">
                Height
              </label>
              <input
                type="number"
                className="form-control"
                onChange={onHandleChange}
                value={productData.height}
                id="height"
                name="height"
                required
              />
            </div>
          </div>
          <span className="d-block">Birthday</span>
          <DatePicker
            selected={startdate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
          <div className="mb-3 mt-3">
            <label htmlFor="blood_type" className="form-label">
              Blood Type
            </label>
            <input
              type="text"
              className="form-control"
              onChange={onHandleChange}
              value={productData.blood_type}
              id="blood_type"
              name="blood_type"
              required
            />
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="hobby" className="form-label">
              Hobby
            </label>
            <input
              type="text"
              className="form-control"
              onChange={onHandleChange}
              value={productData.hobby}
              id="hobby"
              name="hobby"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              onChange={onHandleChange}
              value={productData.price}
              id="price"
              name="price"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="category"
              className="form-label"
              style={{ marginRight: "20px" }}
            >
              Category:
            </label>
            <select
              name="category"
              id="category"
              value={productData.category}
              onChange={onHandleChange}
              required
            >
              <option value="">Please select a category</option>
              {categories &&
                categories.map((category) => {
                  return (
                    <option value={category.name} key={category._id}>
                      {category.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <button type="submit" className="cp-button">
            {onEdit ? "Upadte" : "Create"}
          </button>
        </form>
      </div>
    </>
  );
};

export default QuanLySanPham;
