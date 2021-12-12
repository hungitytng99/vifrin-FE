import React, { lazy } from "react";
import { initModules } from "router";
import { RocketFilled, RocketOutlined } from "@ant-design/icons";

export const exploreModule = { key: "profile", path: "Profile" };

const exploreRoute = {
  index: 3,
  path: "/profile/:username",
  label: "Profile",
  exact: true,
  isPrivate: true,
  isShowOnNav: false,
  activeIcon: <RocketFilled />,
  inActiveIcon: <RocketOutlined />,
  component: lazy(async () => {
    await initModules([exploreModule], "app");
    return import(".");
  }),
};
export default exploreRoute;
