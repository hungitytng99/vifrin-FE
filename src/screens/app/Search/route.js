import React, { lazy } from "react";
import { initModules } from "router";
import { RocketFilled, RocketOutlined } from "@ant-design/icons";

export const searchModule = { key: "search", path: "Search" };

const route = {
  index: 3,
  path: "/search",
  label: "Search",
  exact: true,
  isPrivate: true,
  isShowOnNav: false,
  activeIcon: <RocketFilled />,
  inActiveIcon: <RocketOutlined />,
  component: lazy(async () => {
    await initModules([searchModule], "app");
    return import(".");
  }),
};
export default route;
