import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { Spin } from "antd";
import { authRoutes } from "router";
import PrivateRoute from "router/PrivateRoute";
import PublicRoute from "router/PublicRoute";
import AuthLayout from "components/AuthLayout/AuthLayout";
import FullComponentLoading from "components/Loading/FullComponentLoading";

function AuthRoute() {
  return (
    <AuthLayout>
      <Suspense fallback={<FullComponentLoading />}>
        <Switch>
          {authRoutes.map(
            ({
              component: Component,
              exact = true,
              path,
              isPrivate,
              ...rest
            }) => {
              if (isPrivate) {
                return (
                  <PrivateRoute
                    key={path}
                    component={Component}
                    exact={exact}
                    path={path}
                    {...rest}
                  />
                );
              } else
                return (
                  <PublicRoute
                    key={path}
                    exact={exact}
                    path={path}
                    component={Component}
                    {...rest}
                  />
                );
            }
          )}
        </Switch>
      </Suspense>
    </AuthLayout>

  );
}

export default AuthRoute;
