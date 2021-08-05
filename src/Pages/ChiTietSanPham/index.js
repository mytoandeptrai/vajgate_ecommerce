import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ProductCard from "../../Components/ProductCard";
import { layChiTietSanPham } from "../../Redux/Products/products.actions";

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

  const isLoadingDetail = useSelector(
    (state) => state.productsData.isLoadingDetail
  );
  const product = useSelector((state) => state.productsData.product);

  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <ProductCard
        isLoadingDetail={isLoadingDetail}
        product={product}
        isAdmin={isAdmin}
      />
    </>
  );
};

export default ChiTietSanPham;
