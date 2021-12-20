import React, { lazy } from "react";
import { initModules } from "router";
import { RocketFilled, RocketOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from 'uuid';
export const exploreModule = { key: "location", path: "Location" };

const exploreRoute = {
  index: uuidv4(),
  path: "/location/:id",
  exact: true,
  isPrivate: true,
  isShowOnNav: false,
  // activeIcon: <RocketFilled />,
  // inActiveIcon: <RocketOutlined />,
  component: lazy(async () => {
    await initModules([exploreModule], "app");
    return import(".");
  }),
};
export default exploreRoute;
