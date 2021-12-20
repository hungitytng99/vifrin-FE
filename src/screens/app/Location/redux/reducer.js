import { REQUEST_STATE } from "configs";
import { GET_DETAIL_LOCATION, GET_DETAIL_LOCATION_SUCCESS } from "./action";

const defaultState = {
  detailLocation: {},

  getDetailLocationState: null,
};

export default function locationReducer(state = defaultState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_DETAIL_LOCATION().type: {
      return {
        ...state,
        getDetailLocationState: REQUEST_STATE.REQUEST,
      }
    }
    case GET_DETAIL_LOCATION_SUCCESS().type: {
      const { location } = payload;
      return {
        ...state,
        detailLocation: location,
        getDetailLocationState: REQUEST_STATE.SUCCESS,
      };
    }
    default:
      return state;
  }
}
