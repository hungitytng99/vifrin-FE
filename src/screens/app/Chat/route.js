import React, { lazy } from "react";
import { initModules } from "router";
import { MessageFilled, MessageOutlined } from "@ant-design/icons";

export const chatModule = { key: "chat", path: "Chat" };

const chatRoute = {
  index: 2,
  path: "/direct/inbox",
  label: "Messenger",
  exact: true,
  isPrivate: true,
  isShowOnNav: false,
  activeIcon: <MessageFilled />,
  inActiveIcon: <MessageOutlined />,
  component: lazy(async () => {
    await initModules([chatModule], "app");
    return import(".");
  }),
};

export default chatRoute;
