import { DELETE, GET, POST, PUT } from "data-source/fetch.js";
import { REQUEST_STATE } from "configs/index.js";

export const apiAddUser = async (params) => {
  try {
    const response = await POST("/users/", params, {
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

export const apiGetUserByUserName = async (username) => {
  try {
    const response = await GET(
      "/users/" + username,
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

export const apiCurrentUser = async (params) => {
  try {
    const response = await GET("/users/me", params, {
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

export const apiGetUserProfile = async (params) => {
  try {
    const response = await GET("/users/profile", params, {
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

export const apiUpdateUserProfile = async (params) => {
  try {
    const response = await PUT("/users/profile", params, {
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

export const apiUploadAvatar = async (params) => {
  try {
    const response = await POST("/users/avatar", params, {
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

export const apiFollowOtherUser = async (id) => {
  try {
    const response = await POST("/users/follow/" + id);
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

export const apiUnFollowOtherUser = async (id) => {
  try {
    const response = await DELETE("/users/unfollow/" + id);
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

export const apiDeleteFollow = async (id) => {
  try {
    const response = await DELETE("/users/follow/" + id);
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

export const apiGetListFollower = async (id) => {
  try {
    const response = await GET(
      "/users/" + id + "/followers",
      {},
      { isFullPath: false }
    );
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

export const apiGetListFollowing = async (id) => {
  try {
    const response = await GET(
      "/users/" + id + "/followings",
      {},
      { isFullPath: false }
    );
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

export const apiSignUp = async (params) => {
  try {
    const response = await POST("/auth/register", params, {
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

export const apiLogin = async (params) => {
  try {
    const response = await POST("/auth/login", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
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
