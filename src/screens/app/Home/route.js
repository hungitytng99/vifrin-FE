import React, { lazy } from "react";
import { initModules } from "router";
import { HomeOutlined, HomeFilled } from "@ant-design/icons";
import { v4 as uuidv4 } from 'uuid';

export const homeModule = { key: "homepage", path: "Home" };

const homeRoute = {
  index: uuidv4(),
  path: "/",
  exact: true,
  isPrivate: false,
  isShowOnNav: true,
  activeIcon: <HomeFilled />,
  inActiveIcon: <HomeOutlined />,
  component: lazy(async () => {
    await initModules([homeModule], "app");
    return import(".");
  }),
};

export default homeRoute;
