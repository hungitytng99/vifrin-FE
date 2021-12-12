// config for dev;
export const Configs = {
  // BASE_API: "http://13.213.10.119:3000/api",
  BASE_API: "http://localhost:9191",
  ENV: "development",

  CURRENT_PAGE: 1,
  FILE_MAXIMUM: 2, //MB
  PAGE_SIZE_20: 20,
};

export const REQUEST_STATE = {
  ERROR: "ERROR",
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
};

export const ACTION_TYPE = {
  CREATE: "CREATE",
  LIST: "LIST",
  VIEW: "VIEW",
  DELETE: "DELETE",
  UPDATE: "UPDATE",
  UNMOUNT: "UNMOUNT",
};

export const ROLE_TYPE = {
  User: 0,
  Admin: 1,
};

export const AUTH_STATUS = {
  SUCCESS: 1,
  FAIL: 2,
  PENDING: 0,
};

export const I18LANGUAGE = 'i18nextLng';

