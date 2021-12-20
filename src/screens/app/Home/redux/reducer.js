import { REQUEST_STATE } from "configs";
import { GET_LIST_SUGGEST_FOLLOWER, GET_LIST_SUGGEST_FOLLOWER_FAIL, GET_LIST_SUGGEST_FOLLOWER_SUCCESS, HOMEPAGE_GET_FEED, HOMEPAGE_GET_FEED_FAIL, HOMEPAGE_GET_FEED_SUCCESS } from "./action";

const defaultState = {
  listSuggestionUser: [],
  listPostsInFeed: [],

  getListSuggestionState: null,
  getListPostsInFeedState: null,
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
      const { listPost } = action.payload;
      return {
        ...state,
        listPostsInFeed: listPost ?? [],
        getListPostsInFeedState: REQUEST_STATE.SUCCESS,
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
        getListPostsInFeedState: REQUEST_STATE.ERROR,
      }
    }
    
    default:
      return state;
  }
}
