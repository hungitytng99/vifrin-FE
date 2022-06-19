import React, { lazy } from "react";
import { initModules } from "router";
import { v4 as uuidv4 } from 'uuid';
export const destinationModule = { key: "destination", path: "Destination" };
export const profileModule = { key: "profile", path: "Profile" };


const exploreRoute = {
  index: 4,
  path: "/destination/:id",
  exact: true,
  isPrivate: true,
  isShowOnNav: false,
  component: lazy(async () => {
    await initModules([profileModule, destinationModule ], "app");
    return import(".");
  }),
};
export default exploreRoute;
