import { REQUEST_STATE } from "configs";
import { DELETE, GET, POST, PUT } from "data-source/fetch";

export const apiSearchUserAndDestination = async (params) => {
  try {
    const response = await GET("/search/", params, {
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