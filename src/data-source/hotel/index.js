import { REQUEST_STATE } from "configs";
import { GET, POST } from "../fetch";

export const apiGetTopHotelByDestination = async (params) => {
  try {
    let newsParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null || v != undefined));
    const response = await GET("/hotel/get-top-hotel-by-destination", newsParams);
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