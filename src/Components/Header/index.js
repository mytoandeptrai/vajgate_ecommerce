import React, { useState } from "react";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./style.css";
import Cart from "./icons/cart.svg";
import Menu from "./icons/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Utilities/firebase/utils";
import userTypes from "../../Redux/User/user.types";
import CartHover from "../CartHover";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const [isLogged, setisLogged] = useState(false);
  const currentUser = useSelector((state) => state.usersData.currentUser);
  const cartItems = useSelector((state) => state.cartsData.cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setProfile(document.querySelector(".profile"));
    }
  }, [currentUser]);

  useEffect(() => {
    if (profile) {
      profile.addEventListener("click", function () {
        profile.classList.toggle("active");
      });
    }
  }, [profile]);

  const hanldeLogout = () => {
    auth.signOut();
    dispatch(
      dispatch({
        type: userTypes.SET_CURRENT_USER,
        payload: null,
      })
    );
  };

  const adminRoute = () => {
    return (
      <>
        <NavLink
          to="/create_product"
          activeClassName="nav-link--active"
          className="nav-link"
          exact
        >
          Create Product
        </NavLink>
        <NavLink
          to="/categories"
          activeClassName="nav-link--active"
          className="nav-link"
          exact
        >
          Categories
        </NavLink>
        <NavLink
          to="/history"
          activeClassName="nav-link--active"
          className="nav-link"
          exact
        >
          History
        </NavLink>
      </>
    );
  };

  const userRoute = () => {
    return (
      <>
        <img src={currentUser.image} alt="menu" className="profile-image"></img>
        <div className="profile-indicator"></div>
        <NavLink
          to="/history"
          activeClassName="nav-link--active"
          className="nav-link "
          exact
        >
          History
        </NavLink>
        <NavLink
          to="/"
          activeClassName=""
          className="nav-link "
          exact
          onClick={hanldeLogout}
        >
          Logout
        </NavLink>
      </>
    );
  };

  useEffect(() => {
    const menu1 = document.querySelector(".menu");
    menu1.addEventListener("click", () => {
      setMenu(true);
    });
  }, []);

  return (
    <>
      <header className="header" id="header">
        <h2>
          <Link
            to="/"
            exact="true"
            className="logo"
            style={
              currentUser?.maLoaiNguoiDung === "QuanTri"
                ? { fontSize: "20px" }
                : {}
            }
          >
            VAJGATE{currentUser?.maLoaiNguoiDung === "QuanTri" ? "-Admin" : ""}
          </Link>
        </h2>
        <ul className="nav">
          <li>
            <NavLink
              to="/"
              activeClassName="nav-link--active"
              className="nav-link"
              exact
            >
              Home
            </NavLink>
          </li>
          {currentUser?.maLoaiNguoiDung === "QuanTri" ? adminRoute() : ""}
        </ul>
        <div className="header-right">
          <div className="cart">
            <Link to="/cart">
              <span className="nb">{currentUser ? cartItems.length : 0}</span>
              <img src={Cart} alt="cart"></img>
            </Link>
            <CartHover currentUser={currentUser} cartItems={cartItems} />
          </div>

          {isLogged ? (
            <>
              <div className="menu">
                <img className="header-menu" src={Menu} alt="img" />
              </div>
              <div className={menu ? "rp-menu-child active" : "rp-menu-child"}>
                <div
                  className="rp-menu-child-close"
                  onClick={() => setMenu(false)}
                >
                  X
                </div>
                <div
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <NavLink
                    to="/history"
                    activeClassName="nav-link--active"
                    className="nav-link "
                    exact
                  >
                    History
                  </NavLink>
                  <NavLink
                    to="/"
                    activeClassName=""
                    className="nav-link "
                    exact
                  >
                    Logout
                  </NavLink>
                </div>
                {currentUser?.maLoaiNguoiDung === "QuanTri" ? adminRoute() : ""}
              </div>
            </>
          ) : (
            <>
              <div className="menu">
                <img className="header-menu" src={Menu} alt="img" />
              </div>
              <div className={menu ? "rp-menu-child active" : "rp-menu-child"}>
                <div
                  className="rp-menu-child-close"
                  onClick={() => setMenu(false)}
                >
                  X
                </div>
                <div
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <div>
                    <NavLink
                      to="/login"
                      className="nav-link"
                      activeClassName="nav-link--active"
                    >
                      Login
                    </NavLink>
                  </div>
                  <div>
                    <NavLink
                      to="/register"
                      className="nav-link"
                      activeClassName="nav-link--active"
                    >
                      Register
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentUser ? (
            <div className="profile-box">
              <div className="profile">
                <div className="profile-name">{String(currentUser.hoTen)}</div>
                <i className="fas fa-sort-down"></i>
              </div>
              <div className="profile-child">{userRoute()}</div>
            </div>
          ) : (
            <div className="menu-login-sm">
              <div>
                <NavLink
                  to="/login"
                  className="nav-link"
                  activeClassName="nav-link--active"
                >
                  Login
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/register"
                  className="nav-link"
                  activeClassName="nav-link--active"
                >
                  Register
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
