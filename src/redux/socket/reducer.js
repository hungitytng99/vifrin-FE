import { REQUEST_STATE } from "configs";
import Cookies from "js-cookie";
import {
  CREATE_SOCKET_CONNECTION,
  CREATE_SOCKET_CONNECTION_FAIL,
  CREATE_SOCKET_CONNECTION_SUCCESS,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  logout,
  REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  RESET_AUTH_STATE,
  RESET_SOCKET_CONNECTION,
} from "./action";

const defaultState = {
  socket: null,
};

export default function socketReducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_SOCKET_CONNECTION().type: {
      const { socket } = action.payload;
      return {
        ...state,
        socket,
      };
    }
    case CREATE_SOCKET_CONNECTION_SUCCESS().type: {
      return {
        ...state,
      };
    }
    case CREATE_SOCKET_CONNECTION_FAIL().type: {
      return {
        ...state,
        authState: REQUEST_STATE.ERROR,
      };
    }
    case RESET_SOCKET_CONNECTION().type: {
      return {
        socket: null,
      };
    }
    default:
      return state;
  }
}
