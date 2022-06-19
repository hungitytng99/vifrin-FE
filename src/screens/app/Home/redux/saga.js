import { call, put, takeLatest } from "@redux-saga/core/effects";
import { REQUEST_STATE } from "configs";
import { apiGetTopDestination } from "data-source/destination";
import { apiGetFeed } from "data-source/feed";
import { apiFollowOtherUser, apiGetListSuggestion } from "data-source/users";
import {
  GET_LIST_SUGGEST_FOLLOWER,
  GET_LIST_SUGGEST_FOLLOWER_SUCCESS,
  GET_TOP_DESTINATION,
  GET_TOP_DESTINATION_FAIL,
  GET_TOP_DESTINATION_SUCCESS,
  HOMEPAGE_FOLLOW,
  HOMEPAGE_FOLLOW_SUCCESS,
  HOMEPAGE_GET_FEED,
  HOMEPAGE_GET_FEED_FAIL,
  HOMEPAGE_GET_FEED_SUCCESS,
} from "./action";

function* getListSuggestFollower({ type, payload }) {
  const { params } = payload;
  try {
    const response = yield call(apiGetListSuggestion, params);
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(
        GET_LIST_SUGGEST_FOLLOWER_SUCCESS({
          listUser: response.data,
        })
      );
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
      yield put(HOMEPAGE_FOLLOW_SUCCESS());
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* getFeed({ type, payload }) {
  const { params } = payload;
  console.log('params: ', params);
  try {
    const response = yield call(apiGetFeed, params);
    console.log(' typeof(response?.data): ', typeof (response?.data));
    const totalFeed = yield call(apiGetFeed);
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(
        HOMEPAGE_GET_FEED_SUCCESS({
          listPost: typeof (response?.data) === "string" ? [] : response?.data,
          total: typeof (response?.data) === "string" ? 0 : totalFeed.data.length,
        })
      );
    } else {
      yield put(
        HOMEPAGE_GET_FEED_FAIL({
          listPost: response.data,
          total: totalFeed.data.length,
        })
      );
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* getTopDestination({ type, payload }) {
  const { page, size } = payload;
  try {
    const response = yield call(apiGetTopDestination, { page, size });
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(GET_TOP_DESTINATION_SUCCESS({
        data: response?.data
      }));
    } else {
      yield put(GET_TOP_DESTINATION_FAIL());
    }
  } catch (error) {
    console.log('error: ', error);
  }
}

export default function* homeSaga() {
  yield takeLatest(GET_LIST_SUGGEST_FOLLOWER().type, getListSuggestFollower);
  yield takeLatest(HOMEPAGE_FOLLOW().type, follow);
  yield takeLatest(HOMEPAGE_GET_FEED().type, getFeed);
  yield takeLatest(GET_TOP_DESTINATION().type, getTopDestination);
}
