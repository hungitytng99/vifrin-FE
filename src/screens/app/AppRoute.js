import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
// import ErrorNotFound from '../components/common/ErrorNotFound';
import PrivateRoute from "router/PrivateRoute";
import PublicRoute from "router/PublicRoute";
import MainLayout from "components/MainLayout/MainLayout";
import { appRoutes } from "router";
import FullComponentLoading from "components/Loading/FullComponentLoading";

function AppRoute() {
  return (
    <MainLayout>
      <Suspense fallback={<FullComponentLoading />}>
        <Switch>
          {appRoutes.map(
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
    </MainLayout>
  );
}

export default AppRoute;
