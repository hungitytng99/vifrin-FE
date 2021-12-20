import { REQUEST_STATE } from "configs";
import { UPLOAD } from "../fetch";

export const apiUploadMedia = async (file) => {
  try {
    const response = await UPLOAD("http://20.210.201.100:9009/medias/upload", file, {
      isFullPath: true,
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
