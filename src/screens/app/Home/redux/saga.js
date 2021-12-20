import { call, put, takeLatest } from "@redux-saga/core/effects";
import { REQUEST_STATE } from "configs";
import { apiFollowOtherUser, apiGetListSuggestion } from "data-source/users";
import {
  GET_LIST_SUGGEST_FOLLOWER,
  GET_LIST_SUGGEST_FOLLOWER_SUCCESS,
  HOMEPAGE_FOLLOW,
  HOMEPAGE_FOLLOW_SUCCESS,
  HOMEPAGE_GET_FEED,
  HOMEPAGE_GET_FEED_SUCCESS,
} from "./action";

function* getListSuggestFollower({ type, payload }) {
  const { params } = payload;
  console.log("params: ", params);
  try {
    const response = yield call(apiGetListSuggestion, params);
    console.log("response: ", response);
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
  try {
    // const response = yield call( , params);
    // if (response.state === REQUEST_STATE.SUCCESS) {
    //   yield put(HOMEPAGE_GET_FEED_SUCCESS({
    //     listPost:
    //   }));
    // }
  } catch (error) {
    console.log("error: ", error);
  }
}

export default function* homeSaga() {
  yield takeLatest(GET_LIST_SUGGEST_FOLLOWER().type, getListSuggestFollower);
  yield takeLatest(HOMEPAGE_FOLLOW().type, follow);
  yield takeLatest(HOMEPAGE_GET_FEED().type, getFeed);

}
