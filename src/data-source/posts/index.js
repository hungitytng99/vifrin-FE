import { REQUEST_STATE } from "configs";
import { DELETE, GET, POST, PUT } from "data-source/fetch";

export const apiPostPost = async (params) => {
  try {
    const response = await POST("/posts/", params, {
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

export const apiDeletePost = async (id) => {
  try {
    const response = await DELETE("/posts/" + id, {});
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

export const apiGetPost = async (id) => {
  try {
    const response = await GET("/posts/" + id, {});
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

export const apiUpdatePost = async (params) => {
  try {
    const response = await PUT("/posts/", params);
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

export const apiGetMyPosts = async (params) => {
  try {
    const response = await GET("/posts/me", params);
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

export const apiPostsByUsername = async (params) => {
  try {
    const response = await GET("/posts", params);
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
