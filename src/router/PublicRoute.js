import Cookies from "js-cookie";
import React from "react";
import { Route, Redirect } from "react-router-dom";
function PublicRoute({
  component: Component,
  checkRedirectHome = false,
  ...rest
}) {
  if (Cookies.get("token") && checkRedirectHome) {
    return <Redirect to="/" />;
  } else {
    return (
      <Route
        {...rest}
        render={(props) => {
          return <Component {...props} />;
        }}
      />
    );
  }
}
export default PublicRoute;
