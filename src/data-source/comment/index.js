import { DELETE, GET, POST, PUT } from "data-source/fetch.js";
import { REQUEST_STATE } from "configs/index.js";

export const apiCreateComment = async (params) => {
  try {
    const response = await POST("/comments/", params, {
      isFullPath: false,
    });
    return {
      state: REQUEST_STATE.SUCCESS,
      data: response.data,
    };
  } catch (error) {
    console.log("error", error);
    return {
      state: REQUEST_STATE.ERROR,
      message: error.message,
    };
  }
};

export const apiGetDetailComment = async (id) => {
  try {
    const response = await GET(
      "/comments/" + id,
      {},
      {
        isFullPath: false,
      }
    );
    return {
      state: REQUEST_STATE.SUCCESS,
      data: response.data,
    };
  } catch (error) {
    console.log("error", error);
    return {
      state: REQUEST_STATE.ERROR,
      message: error.message,
    };
  }
};

export const apiGetListCommentByPost = async (id, params) => {
  try {
    const response = await GET("/comments/by-post/" + id, params, {
      isFullPath: false,
    });
    return {
      state: REQUEST_STATE.SUCCESS,
      data: response.data,
    };
  } catch (error) {
    console.log("error", error);
    return {
      state: REQUEST_STATE.ERROR,
      message: error.message,
    };
  }
};
