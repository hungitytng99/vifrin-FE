import { DELETE, GET, POST, PUT } from "data-source/fetch.js";
import {
  REGISTER_ACCOUNT_DEFAULT_MESSAGE,
  REGISTER_ACCOUNT_EMAIL_EXIST,
  REGISTER_ACCOUNT_USERNAME_EXIST,
  REGISTER_ACCOUNT_USERNAME_SUCCESS,
  REQUEST_STATE,
} from "configs/index.js";

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

export const apiGetListSuggestion = async (params) => {
  try {
    const response = await GET("/users/suggestions", params, {
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

// code 1001: email ton tai
// code 1002: username da ton tai
export const apiSignUp = async (params) => {
  try {
    const response = await POST("/auth/register", params, {
      isFullPath: false,
    });
    return {
      state: REQUEST_STATE.SUCCESS,
      data: response.data,
      message: REGISTER_ACCOUNT_USERNAME_SUCCESS,
    };
  } catch (error) {
    console.log("error", error);
    switch (error.code) {
      case 1001:
        return {
          state: REQUEST_STATE.ERROR,
          data: error.data,
          message: REGISTER_ACCOUNT_EMAIL_EXIST,
        };
      case 1002:
        return {
          state: REQUEST_STATE.ERROR,
          data: error.data,
          message: REGISTER_ACCOUNT_USERNAME_EXIST,
        };
      default:
        return {
          state: REQUEST_STATE.ERROR,
          data: error.data,
          message: REGISTER_ACCOUNT_DEFAULT_MESSAGE,
        };
    }
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
