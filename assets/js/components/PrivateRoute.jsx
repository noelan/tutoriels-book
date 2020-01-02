import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";

const PrivateRoute = ({ path, component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Route path={path} component={component} />;
  } else {
    toast.error("Veuillez vous connecter");
    return (
      <>
        <Redirect to="/login" />
      </>
    );
  }
};

export default PrivateRoute;
