import { Suspense } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { appRoutes, authRoutes } from "./router";
import FullComponentLoading from "./components/Loading/FullComponentLoading";
import AppRoute from "./screens/app/AppRoute";
import AuthRoute from "./screens/auth/AuthRoute";
import './App.sass'
import "react-responsive-carousel/lib/styles/carousel.min.css";import vi from "javascript-time-ago/locale/vi.json";
import en from "javascript-time-ago/locale/en.json";
import TimeAgo from "javascript-time-ago";

TimeAgo.addDefaultLocale(vi);
TimeAgo.addLocale(en);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<FullComponentLoading />}>
        <Switch>
          {authRoutes.map((route) => {
            return (
              <Route
                path={route.path}
                render={() => <AuthRoute />}
                key={route.path}
                exact={route.exact}
              />
            );
          })}
          {appRoutes.map((route) => {
            return (
              <Route
                path={route.path}
                render={() => <AppRoute />}
                key={route.path}
                exact={route.exact}
              />
            );
          })}
          <Redirect from="*" to="/auth/login" />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
