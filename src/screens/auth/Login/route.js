import { lazy } from "react";
export const loginModule = { key: "user", path: "Login" };

const loginRoute = {
  path: "/auth/login",
  exact: true,
  isPrivate: false,
  component: lazy(async () => {
    // await initModules([], "auth");
    return import(".");
  }),
  checkRedirectHome: true,
};

// export const childRoutes = [
//   {
//     path: "/test/xxxx",
//     exact: true, //map to tabview
//     isPrivate: false,
//     component: lazy(async () => {
//       await initModules([registerModule], "auth");
//       return import("./components/Test");
//     }),
//   },
// ];

export default loginRoute;
