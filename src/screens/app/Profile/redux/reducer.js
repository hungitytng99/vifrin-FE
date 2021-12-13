import { REQUEST_STATE } from "configs";
import { sortImagesById } from "utils/media";
import {
  FOLLOW_SUCCESS,
  GET_LIST_FOLLOWER_SUCCESS,
  UNFOLLOW_SUCCESS,
  FOLLOW,
  GET_LIST_FOLLOWER,
  DELETE_FOLLOW_SUCCESS,
  GET_LIST_FOLLOWING_SUCCESS,
  GET_LIST_FOLLOWING,
  GET_LIST_POST_BY_USERNAME_SUCCESS,
  GET_LIST_POST_BY_USERNAME,
  RESET_PROFILE_STATE,
  GET_DETAIL_POST_BY_ID,
  GET_DETAIL_POST_BY_ID_SUCCESS,
  RESET_DETAIL_PROFILE_STATE,
  CHECK_ISCURRENT_USER,
  CREATE_POST_SUCCESS,
  CREATE_POST,
  RESET_CREATE_POST_STATE,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  RESET_EDIT_POST_STATE,
} from "./action";

const defaultState = {
  isCurrentUser: false,
  listPostByUsername: [],
  detailPost: {},
  listFollowers: [],
  listFollowing: [],

  getDetailPostState: null,
  getListFollowerState: null,
  getListFollowingState: null,
  getListPostByUsernameState: null,
  createPostState: null,
  deletePostState: null,
  editPostState: null,
  followState: null,
  unFollowState: null,
  deleteFollowState: null,
};

export default function profileReducer(state = defaultState, action) {
  switch (action.type) {
    case CHECK_ISCURRENT_USER().type: {
      return {
        ...state,
        isCurrentUser: action.payload,
      };
    }
    case GET_LIST_FOLLOWER().type: {
      return {
        ...state,
        getListFollowerState: REQUEST_STATE.REQUEST,
      };
    }
    case GET_LIST_FOLLOWER_SUCCESS().type: {
      return {
        ...state,
        listFollowers: action.payload,
        getListFollowerState: REQUEST_STATE.SUCCESS,
      };
    }
    case GET_LIST_FOLLOWING().type: {
      return {
        ...state,
        getListFollowingState: REQUEST_STATE.REQUEST,
      };
    }
    case GET_LIST_FOLLOWING_SUCCESS().type: {
      return {
        ...state,
        listFollowing: action.payload,
        getListFollowingState: REQUEST_STATE.SUCCESS,
      };
    }
    case FOLLOW().type: {
      return {
        ...state,
        followState: REQUEST_STATE.REQUEST,
      };
    }
    case FOLLOW_SUCCESS().type: {
      return {
        ...state,
        followState: REQUEST_STATE.SUCCESS,
      };
    }
    case UNFOLLOW_SUCCESS().type: {
      return {
        ...state,
        followState: REQUEST_STATE.SUCCESS,
      };
    }
    case CREATE_POST().type: {
      return {
        ...state,
        createPostState: REQUEST_STATE.REQUEST,
      };
    }
    case CREATE_POST_SUCCESS().type: {
      return {
        ...state,
        createPostState: REQUEST_STATE.SUCCESS,
        listPostByUsername: [action.payload, ...state.listPostByUsername],
      };
    }
    case EDIT_POST().type: {
      return {
        ...state,
        editPostState: REQUEST_STATE.REQUEST,
      };
    }
    case EDIT_POST_SUCCESS().type: {
      const { posts } = action.payload;
      return {
        ...state,
        editPostState: REQUEST_STATE.SUCCESS,
        listPostByUsername: sortImagesById(
          state.listPostByUsername.map((post) => {
            if (posts.id === post.id) {
              return posts;
            } else {
              return post;
            }
          })
        ),
      };
    }

    case DELETE_POST().type: {
      return {
        ...state,
        deletePostState: REQUEST_STATE.REQUEST,
      };
    }
    case DELETE_POST_SUCCESS().type: {
      const { id } = action.payload;
      return {
        ...state,
        deletePostState: REQUEST_STATE.SUCCESS,
        listPostByUsername: state.listPostByUsername.filter(
          (post) => post.id !== id
        ),
      };
    }

    case RESET_CREATE_POST_STATE().type: {
      return {
        ...state,
        createPostState: null,
      };
    }

    case RESET_EDIT_POST_STATE().type: {
      return {
        ...state,
        editPostState: null,
      };
    }

    case DELETE_FOLLOW_SUCCESS().type: {
      return {
        ...state,
        deleteFollowState: REQUEST_STATE.SUCCESS,
      };
    }
    case GET_LIST_POST_BY_USERNAME().type: {
      return {
        ...state,
        getListPostByUsernameState: REQUEST_STATE.REQUEST,
      };
    }
    case GET_LIST_POST_BY_USERNAME_SUCCESS().type: {
      return {
        ...state,
        listPostByUsername: sortImagesById(action.payload),
        getListPostByUsernameState: REQUEST_STATE.SUCCESS,
      };
    }

    case GET_DETAIL_POST_BY_ID().type: {
      return {
        ...state,
        getDetailPostState: REQUEST_STATE.REQUEST,
      };
    }

    case GET_DETAIL_POST_BY_ID_SUCCESS().type: {
      return {
        ...state,
        getDetailPostState: REQUEST_STATE.SUCCESS,
        detailPost: action.payload,
      };
    }

    case RESET_DETAIL_PROFILE_STATE().type: {
      return {
        ...state,
        detailPost: null,
        getDetailPostState: null,
      };
    }

    case RESET_PROFILE_STATE().type: {
      return {
        ...defaultState,
      };
    }

    default:
      return state;
  }
}
