import { LOGIN_fail, LOGIN_SUCCESS } from "./action";

const defaultState = {
  profile: null,
};

export default function loginReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS().type: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case LOGIN_fail().type: {
      return {
        ...state,
        profile: null,
      };
    }
    default:
      return state;
  }
}
