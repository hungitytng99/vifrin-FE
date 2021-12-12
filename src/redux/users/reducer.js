import { REQUEST_STATE } from "configs";
import Cookies from "js-cookie";
import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  logout,
  RESET_AUTH_STATE,
} from "./action";

const defaultState = {
  profile: null,
  authState: null,
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN().type: {
      return {
        ...state,
        authState: REQUEST_STATE.REQUEST,
      };
    }
    case LOGIN_SUCCESS().type: {
      return {
        ...state,
        profile: action.payload,
        authState: REQUEST_STATE.SUCCESS,
      };
    }
    case LOGIN_FAIL().type: {
      return {
        ...state,
        authState: REQUEST_STATE.ERROR,
      };
    }
    case RESET_AUTH_STATE().type: {
      return { ...defaultState };
    }
    case logout().type: {
      Cookies.remove("token");
      return { ...defaultState };
    }
    default:
      return state;
  }
}
