import { REQUEST_STATE } from "configs";
import { DELETE, GET, POST, PUT } from "data-source/fetch";

export const apiAddLike = async (params) => {
  try {
    const response = await POST("/likes/", params, {
      isFullPath: false,
    });
    return {
      state: REQUEST_STATE.SUCCESS,
      data: response,
    };
  } catch (error) {
    console.log("error", error);
    return {
      state: REQUEST_STATE.ERROR,
      message: error.message,
    };
  }
};

export const apiGetLike = async (id) => {
  try {
    const response = await GET("/likes/by-post/" + id, {
      isFullPath: false,
    });
    return {
      state: REQUEST_STATE.SUCCESS,
      data: response,
    };
  } catch (error) {
    console.log("error", error);
    return {
      state: REQUEST_STATE.ERROR,
      message: error.message,
    };
  }
};