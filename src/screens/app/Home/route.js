import React, { lazy } from "react";
import { initModules } from "router";
import { HomeOutlined, HomeFilled } from "@ant-design/icons";

export const homeModule = { key: "homepage", path: "Home" };

const homeRoute = {
  index: 1,
  path: "/",
  exact: true,
  isPrivate: true,
  isShowOnNav: true,
  activeIcon: <HomeFilled />,
  inActiveIcon: <HomeOutlined />,
  component: lazy(async () => {
    await initModules([homeModule], "app");
    return import(".");
  }),
};

export default homeRoute;
