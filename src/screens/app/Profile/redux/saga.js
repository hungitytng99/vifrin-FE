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
import { apiUploadMedia } from "../../../../data-source/media";
import { apiCreatePost } from "../../../../data-source/posts";
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
  CREATE_POST,
  CREATE_POST_SUCCESS,
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
    // console.log('response: ', response);
    // response.data = response.data ?? [];
    // for( let i = 0 ; i < response.data.map)
    // response.data = response.data.map((post) => {
    //   return
    // })
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

function* createPost({ type, payload }) {
  const { content, media } = payload;
  try {
    let listImageUpload = [];
    for (let i = 0; i < media.fileList.length; i++) {
      const imgUploadRes = yield call(
        apiUploadMedia,
        media.fileList[i].originFileObj
      );
      if (imgUploadRes?.data?.url) {
        listImageUpload.push(imgUploadRes.data);
      }
    }
    const createPostRes = yield call(apiCreatePost, {
      content: content,
      mediaIds: listImageUpload.map((img) => img.id),
      config: '{"privacy":"audience.public"}',
    });
    if (createPostRes.state === REQUEST_STATE.SUCCESS) {
      yield put(CREATE_POST_SUCCESS(createPostRes.data));
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
  yield takeLatest(CREATE_POST().type, createPost);
}
