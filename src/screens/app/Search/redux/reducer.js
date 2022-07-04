import { REQUEST_STATE } from "configs";
import { combineReducers } from "redux";
import { RESET_SEARCH_BY_KEY, SEARCH_BY_KEY, SEARCH_BY_KEY_FAIL, SEARCH_BY_KEY_SUCCESS } from "./action";

const defaultState = {
  state: null,
  data: {}
};

export default combineReducers({
  result: (state = defaultState, action) => {
    switch (action.type) {
      case SEARCH_BY_KEY().type: {
        return {
          ...state,
          state: REQUEST_STATE.REQUEST,
        };
      }
      case SEARCH_BY_KEY_SUCCESS().type: {
        const { data } = action.payload;
        return {
          ...state,
          data: data,
          state: REQUEST_STATE.SUCCESS,
        };
      }
      case SEARCH_BY_KEY_FAIL().type: {
        return {
          ...state,
          state: REQUEST_STATE.ERROR,
        };
      }
      case RESET_SEARCH_BY_KEY().type: {
        return {
          ...defaultState,
        };
      }
      default:
        return state;
    }
  },
});
