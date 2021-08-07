import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AllProducts from "../../Components/AllProducts";
import PageNotFound from "../../Components/PageNotFound/PageNotFound";
import WithAdminAuth from "../../hoc/WithAdminAuth";
import WithAuth from "../../hoc/WithAuth";
import userTypes from "../../Redux/User/user.types";
import { auth, firestore } from "../../Utilities/firebase/utils";
import Cart from "../Cart";
import ChiTietSanPham from "../ChiTietSanPham";
import DangKy from "../DangKy";
import DangNhap from "../DangNhap";
import QuanLySanPham from "../QuanLySanPham";
import QuanLyTheLoai from "../QuanLyTheLoai";
import Recovery from "../Recovery";
const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        let userConfig = {};
        const userRef = firestore.collection("users").doc(userAuth.uid);

        userRef.get().then((doc) => {
          if (doc.exists) {
            userConfig = doc.data();
            dispatch({
              type: userTypes.SET_CURRENT_USER,
              payload: userConfig,
            });
          }
        });
      } else {
        dispatch({
          type: userTypes.SET_CURRENT_USER,
          payload: null,
        });
      }
    });
    return () => {
      authListener();
    };
  }, []);

  return (
    <>
      <div>
        <Switch>
          <Route exact path="/" component={AllProducts} />
          <Route path="/detail/:productId" component={ChiTietSanPham} exact />
          <Route path="/register" component={DangKy} />
          <Route path="/login" component={DangNhap} />
          <Route path="/recovery" component={Recovery} />
          <Route
            path="/create_product"
            render={() => (
              <WithAdminAuth>
                <QuanLySanPham />
              </WithAdminAuth>
            )}
          />
          <Route
            path="/categories"
            render={() => (
              <WithAdminAuth>
                <QuanLyTheLoai />
              </WithAdminAuth>
            )}
          />

          <Route
            path="/cart"
            render={() => (
              <WithAuth>
                <Cart />
              </WithAuth>
            )}
          />
          <Route exact="*" component={PageNotFound} />
        </Switch>
      </div>
    </>
  );
};

export default HomePage;
