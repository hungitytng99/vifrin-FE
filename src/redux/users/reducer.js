import { REQUEST_STATE } from "configs";
import Cookies from "js-cookie";
import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  logout,
  REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  RESET_AUTH_STATE,
} from "./action";

const defaultState = {
  profile: null,
  authState: null,
  registerResponse: {
    state: null
  },
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
    case REGISTER().type: {
      return {
        ...state,
        registerResponse: { state: REQUEST_STATE.REQUEST },
      };
    }
    case REGISTER_SUCCESS().type: {
      return {
        ...state,
        registerResponse: action.payload,
      };
    }
    case REGISTER_FAIL().type: {
      return {
        ...state,
        registerResponse: action.payload,
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
