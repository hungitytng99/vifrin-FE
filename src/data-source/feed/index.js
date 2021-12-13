import { REQUEST_STATE } from "configs";
import { GET, UPLOAD } from "../fetch";

export const apiGetFeed = async (params) => {
  try {
    const response = await GET("/feed", params);
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
