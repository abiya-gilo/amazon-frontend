import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

const ProtectedRoute = ({
  children,
  msg = "Please sign in to continue",
  redirect = "/",
}) => {
  const navigate = useNavigate();
  const [{ user }] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/signin", { state: { msg, redirect } });
    }
  }, [user, navigate, msg, redirect]);

  return user ? children : null;
};

export default ProtectedRoute;
