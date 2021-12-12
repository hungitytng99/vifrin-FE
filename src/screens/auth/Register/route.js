import { lazy } from "react";
import { initModules } from "router";
export const registerModule = { key: "register", path: "Register" };

const registerRoute = {
  path: "/auth/register",
  exact: true,
  isPrivate: false,
  component: lazy(async () => {
    await initModules([registerModule], "auth");
    return import(".");
  }),
  checkRedirectHome: true,
};
export default registerRoute;
