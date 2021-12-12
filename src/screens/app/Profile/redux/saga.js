import { call, put, takeLatest } from "@redux-saga/core/effects";
import { REQUEST_STATE } from "configs";
import { apiPostsByUsername } from "data-source/posts";
import {
  apiDeleteFollow,
  apiFollowOtherUser,
  apiGetListFollower,
  apiGetListFollowing,
  apiUnFollowOtherUser,
} from "data-source/users";
import {
  GET_LIST_FOLLOWER,
  GET_LIST_FOLLOWER_SUCCESS,
  FOLLOW,
  UNFOLLOW,
  FOLLOW_SUCCESS,
  UNFOLLOW_SUCCESS,
  DELETE_FOLLOW,
  DELETE_FOLLOW_SUCCESS,
  GET_LIST_FOLLOWING,
  GET_LIST_FOLLOWING_SUCCESS,
  GET_LIST_POST_BY_USERNAME,
  GET_LIST_POST_BY_USERNAME_SUCCESS,
} from "./action";

function* getListFollowers({ type, payload }) {
  const { userId } = payload;
  try {
    const response = yield call(apiGetListFollower, userId);
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(GET_LIST_FOLLOWER_SUCCESS(response.data));
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* getListPostByUsername({ type, payload }) {
  const { username } = payload;
  try {
    const response = yield call(apiPostsByUsername, { username });
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(GET_LIST_POST_BY_USERNAME_SUCCESS(response.data ?? []));
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* getListFollowing({ type, payload }) {
  const { userId } = payload;
  try {
    const response = yield call(apiGetListFollowing, userId);
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(GET_LIST_FOLLOWING_SUCCESS(response.data));
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* follow({ type, payload }) {
  const { userId } = payload;
  try {
    const response = yield call(apiFollowOtherUser, userId);
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(FOLLOW_SUCCESS());
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* unfollow({ type, payload }) {
  const { userId } = payload;
  try {
    const response = yield call(apiUnFollowOtherUser, userId);
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(UNFOLLOW_SUCCESS());
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* deleteFollow({ type, payload }) {
  const { userId } = payload;
  try {
    const response = yield call(apiDeleteFollow, userId);
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(DELETE_FOLLOW_SUCCESS());
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

export default function* userSaga() {
  yield takeLatest(GET_LIST_FOLLOWER().type, getListFollowers);
  yield takeLatest(GET_LIST_FOLLOWING().type, getListFollowing);
  yield takeLatest(FOLLOW().type, follow);
  yield takeLatest(UNFOLLOW().type, unfollow);
  yield takeLatest(DELETE_FOLLOW().type, deleteFollow);
  yield takeLatest(GET_LIST_POST_BY_USERNAME().type, getListPostByUsername);
}
