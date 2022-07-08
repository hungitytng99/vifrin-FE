// config for dev;
export const Configs = {
  // BASE_API: "http://13.213.10.119:3000/api",
  BASE_API: process.env.REACT_APP_BASE_API_URL,
  ENV: "development",

  CURRENT_PAGE: 1,
  FILE_MAXIMUM: 2, //MB
  PAGE_SIZE_20: 20,
  PAGE_SIZE_10: 10,
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
export const LANGUAGES = {
  EN: "en",
  VI: "vi",
};
// Constant
export const I18LANGUAGE = "i18nextLng";
export const REMEMBER_ACCOUNT_KEY = "rememberAccount";
export const BEEN_ALERT_UPDATE_PROFILE = "isAlertUpdateProfile";
export const SENDING_REQUEST_KEY = "sending..."; // t
export const SENDING_ERROR_KEY = "sendingError"; // t
export const SENDING_SUCCESS_KEY = "sendingSuccess";
export const CommentPage = {
  DESTINATION: "destination",
  PROFILE: "profile",
};

// Image default
export const AVATAR_DEFAULT =
  "http://res.cloudinary.com/da4oquz0i/image/upload/v1639910699/zrqjbwkmtvypudv9kctr.png";
export const IMAGE_LOCATION_DEFAULT =
  "https://res.cloudinary.com/da4oquz0i/image/upload/v1639929197/ij77a9rewdpggmq1wbnv.png";
export const IMAGE_HOTEL_DEFAULT =
  "http://res.cloudinary.com/dzhowprbg/image/upload/v1656908993/zgihvsdk5v71du2xnqdo.png";
// For language
export const REGISTER_ACCOUNT_EMAIL_EXIST = "yourEmailAlreadyExist"; // t
export const REGISTER_ACCOUNT_USERNAME_EXIST = "yourUsernameAlreadyExist"; // t
export const REGISTER_ACCOUNT_USERNAME_SUCCESS = "yourAccountHaveBeenCreated"; // t
export const REGISTER_ACCOUNT_DEFAULT_MESSAGE = "cannotExcuteActionAtThisTime"; // t

export const MONTHNAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
]; // t

// Socket
export const COMMENT_SOCKET_URL = process.env.REACT_APP_COMMENT_SERVICE;
