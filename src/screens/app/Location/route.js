import React, { lazy } from "react";
import { initModules } from "router";
import { v4 as uuidv4 } from 'uuid';
export const locationModule = { key: "location", path: "Location" };
export const profileModule = { key: "profile", path: "Profile" };


const exploreRoute = {
  index: uuidv4(),
  path: "/location/:id",
  exact: true,
  isPrivate: true,
  isShowOnNav: false,
  component: lazy(async () => {
    await initModules([profileModule, locationModule ], "app");
    return import(".");
  }),
};
export default exploreRoute;
