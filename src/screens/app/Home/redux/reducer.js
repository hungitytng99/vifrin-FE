import { REQUEST_STATE } from "configs";
import { isEmptyValue } from "utils/checkType";
import { GET_LIST_SUGGEST_FOLLOWER, GET_LIST_SUGGEST_FOLLOWER_FAIL, GET_LIST_SUGGEST_FOLLOWER_SUCCESS, GET_TOP_DESTINATION, GET_TOP_DESTINATION_FAIL, GET_TOP_DESTINATION_SUCCESS, HOMEPAGE_GET_FEED, HOMEPAGE_GET_FEED_FAIL, HOMEPAGE_GET_FEED_SUCCESS, HOMEPAGE_GET_TOTAL_FEED_SUCCESS, RESET_GET_TOP_DESTINATION } from "./action";

const defaultState = {
  listSuggestionUser: [],
  listPostsInFeed: [],
  listTopDestinations: [],

  getListSuggestionState: null,
  getListPostsInFeedState: null,
  getTopDestinationsState: null,
};

export default function homeReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_LIST_SUGGEST_FOLLOWER_SUCCESS().type: {
      const { listUser } = action.payload;
      return {
        ...state,
        listSuggestionUser: listUser ?? [],
        getListSuggestionState: REQUEST_STATE.SUCCESS,
      };
    }
    case GET_LIST_SUGGEST_FOLLOWER().type: {
      return {
        ...state,
        getListSuggestionState: REQUEST_STATE.REQUEST,
      }
    }
    case GET_LIST_SUGGEST_FOLLOWER_FAIL().type: {
      return {
        ...state,
        getListSuggestionState: REQUEST_STATE.ERROR,
      }
    }

    case HOMEPAGE_GET_FEED_SUCCESS().type: {
      const { listPost, total } = action.payload;
      return {
        ...state,
        listPostsInFeed: isEmptyValue(listPost) ? [] : listPost,
        getListPostsInFeedState: REQUEST_STATE.SUCCESS,
        total: total,
      };
    }
    case HOMEPAGE_GET_FEED().type: {
      return {
        ...state,
        getListPostsInFeedState: REQUEST_STATE.REQUEST,
      }
    }
    case HOMEPAGE_GET_FEED_FAIL().type: {
      return {
        ...state,
        listPostsInFeed: [],
        getListPostsInFeedState: REQUEST_STATE.ERROR,
      }
    }
    case GET_TOP_DESTINATION().type: {
      return {
        ...state,
        getTopDestinationsState: REQUEST_STATE.REQUEST,
      };
    }
    case GET_TOP_DESTINATION_SUCCESS().type: {
      const { data } = action.payload;
      return {
        ...state,
        listTopDestinations: data,
        getTopDestinationsState: REQUEST_STATE.SUCCESS,
      };
    }
    case GET_TOP_DESTINATION_FAIL().type: {
      return {
        ...state,
        getTopDestinationsState: REQUEST_STATE.ERROR,
      };
    }
    case RESET_GET_TOP_DESTINATION().type: {
      return {
        ...defaultState,
      };
    }

    default:
      return state;
  }
}
