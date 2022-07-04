import { REQUEST_STATE } from "configs";
import { CREATE_NEW_COMMENT, CREATE_NEW_COMMENT_SUCCESS } from "screens/app/Profile/redux/action";
import { GET_DETAIL_LOCATION, GET_DETAIL_LOCATION_SUCCESS, GET_TOP_HOTELS_BY_DESTINATION, GET_TOP_HOTELS_BY_DESTINATION_FAIL, GET_TOP_HOTELS_BY_DESTINATION_SUCCESS, RESET_GET_TOP_HOTELS_BY_DESTINATION } from "./action";

const defaultState = {
  detailLocation: {},
  topHotels: [],
  totalHotels: 0,

  getDetailLocationState: null,
  getTopHotelsState: null,
};

export default function locationReducer(state = defaultState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_DETAIL_LOCATION().type: {
      return {
        ...state,
        getDetailLocationState: REQUEST_STATE.REQUEST,
      };
    }
    case GET_DETAIL_LOCATION_SUCCESS().type: {
      const { location } = payload;
      return {
        ...state,
        detailLocation: location,
        getDetailLocationState: REQUEST_STATE.SUCCESS,
      };
    }

    case CREATE_NEW_COMMENT_SUCCESS().type: {
      console.log("ENTER HERE");
      const { comment } = payload;
      let newListComment = [...(state.detailLocation.listComment ?? [])];
      newListComment = [comment, ...newListComment];
      return {
        ...state,
        detailLocation: {
          ...state.detailLocation,
          listComment: newListComment,
        },
        getDetailLocationState: REQUEST_STATE.SUCCESS,
      };
    }

    case GET_TOP_HOTELS_BY_DESTINATION().type: {
      return {
        ...state,
        getTopHotelsState: REQUEST_STATE.REQUEST,
      };
    }
    case GET_TOP_HOTELS_BY_DESTINATION_SUCCESS().type: {
      const { data } = action.payload;
      const totalHotels = data.length;
      return {
        ...state,
        topHotels: data.filter(hotel => hotel.medias[0]).splice(0, 4),
        totalHotels: totalHotels,
        getTopHotelsState: REQUEST_STATE.SUCCESS,
      };
    }
    case GET_TOP_HOTELS_BY_DESTINATION_FAIL().type: {
      return {
        ...state,
        getTopHotelsState: REQUEST_STATE.ERROR,
      };
    }

    default:
      return state;
  }
}
