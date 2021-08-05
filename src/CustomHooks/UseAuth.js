import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const UseAuth = () => {
  const currentUser = useSelector((state) => state.usersData.currentUser);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  }, [currentUser]);
  return currentUser;
};

export default UseAuth;
