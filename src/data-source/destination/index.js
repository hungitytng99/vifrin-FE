import { REQUEST_STATE } from "configs";
import { GET, POST } from "../fetch";

export const apiCreateDestination = async (params) => {
  try {
    const response = await POST("/destinations", params);
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

export const apiGetDestination = async (id) => {
  try {
    const response = await GET("/destinations/" + id);
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

export const apiSearchDestination = async (params) => {
  try {
    const response = await GET("/destinations/search", params);
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
