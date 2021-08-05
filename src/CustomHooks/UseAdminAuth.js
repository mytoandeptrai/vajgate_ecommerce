import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const UseAdminAuth = () => {
  const currentUser = useSelector((state) => state.usersData.currentUser);
  const history = useHistory();

  useEffect(() => {
    if (currentUser.maLoaiNguoiDung !== "QuanTri") {
      history.push("/login");
    }
  }, [currentUser]);

  return currentUser;
};

export default UseAdminAuth;
