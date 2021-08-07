import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ProductCard from "../../Components/ProductCard";
import {
  layChiTietSanPham,
  layDanhSachSPLienQuan,
} from "../../Redux/Products/products.actions";

const ChiTietSanPham = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(layChiTietSanPham(productId));
  }, [productId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const [isAdmin, setIsAdmin] = useState(false);
  const product = useSelector((state) => state.productsData.product);

  useEffect(() => {
    if (product?.name) {
      dispatch(layDanhSachSPLienQuan(product.category));
    }
  }, [product]);

  return (
    <>
      <ProductCard isAdmin={isAdmin} />
    </>
  );
};

export default ChiTietSanPham;
