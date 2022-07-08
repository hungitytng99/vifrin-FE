import { REQUEST_STATE } from "configs";
import { CREATE_NEW_COMMENT_SUCCESS } from "screens/app/Profile/redux/action";
import { GET_COMMENTS_OF_DESTINATION, GET_COMMENTS_OF_DESTINATION_FAIL, GET_COMMENTS_OF_DESTINATION_SUCCESS, GET_DETAIL_LOCATION, GET_DETAIL_LOCATION_SUCCESS, GET_TOP_HOTELS_BY_DESTINATION, GET_TOP_HOTELS_BY_DESTINATION_FAIL, GET_TOP_HOTELS_BY_DESTINATION_SUCCESS, RESET_GET_COMMENTS_OF_DESTINATION, RESET_GET_TOP_HOTELS_BY_DESTINATION } from "./action";

const defaultState = {
  detailLocation: {},
  topHotels: [],
  totalHotels: 0,
  listComments: [],
  totalComments: 0,

  getDetailLocationState: null,
  createNewCommentState: null,
  getTopHotelsState: null,
  getMoreCommentState: null,
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
      const { comment } = payload;
      let newListComment = [comment, ...(state.listComments ?? [])];
      return {
        ...state,
        listComments: newListComment,
        createNewCommentState: REQUEST_STATE.SUCCESS,
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

    case GET_COMMENTS_OF_DESTINATION().type: {
      return {
        ...state,
        getMoreCommentState: REQUEST_STATE.REQUEST,
      };
    }
    case GET_COMMENTS_OF_DESTINATION_SUCCESS().type: {
      const { data, totalComments } = action.payload;
      return {
        ...state,
        listComments: [...state.listComments, ...data],
        getMoreCommentState: REQUEST_STATE.SUCCESS,
        totalComments: totalComments,
      };
    }
    case GET_COMMENTS_OF_DESTINATION_FAIL().type: {
      return {
        ...state,
        getMoreCommentState: REQUEST_STATE.ERROR,
      };
    }

    default:
      return state;
  }
}
