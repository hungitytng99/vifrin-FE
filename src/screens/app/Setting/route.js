import React, { lazy } from "react";
import { initModules } from "router";
import { RocketFilled, RocketOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from 'uuid';

export const exploreModule = { key: "setting", path: "Setting" };

const exploreRoute = {
  index: 6,
  path: "/setting",
  label: "Settings",
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
