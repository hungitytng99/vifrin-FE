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

export const apiGetDetailDestination = async (id) => {
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

export const apiGetTopDestination = async (params) => {
  try {
    const response = await GET("/destinations/top-ranking", params);
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

export const apiGetExploreDestinations = async (params) => {
  try {
    const response = await GET("/destinations/random_destination", params);
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

export const apiGetAnalyzeStarsByDestination = async (destinationId, params) => {
  try {
    const response = await GET(`/comments/stats-by-destination/${destinationId}`, params);
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
