import { lazy } from "react";
export const loginModule = { key: "user", path: "Login" };

const loginRoute = {
  path: "/auth/register",
  exact: true,
  isPrivate: false,
  component: lazy(async () => {
    return import(".");
  }),
  checkRedirectHome: true,
};

export default loginRoute;
