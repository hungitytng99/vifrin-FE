import { REQUEST_STATE } from "configs";
import { UPLOAD } from "../fetch";

export const apiUploadMedia = async (file) => {
  try {
    const response = await UPLOAD(`${process.env.REACT_APP_MEDIA_SERVICE}/medias/upload`, file, {
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
