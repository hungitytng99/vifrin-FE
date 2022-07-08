import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { REQUEST_STATE } from "configs";
import { apiCreateComment, apiGetListCommentByPost } from "data-source/comment";
import { apiAddLike, apiGetLike } from "data-source/like";
import {
  apiDeletePost,
  apiPostsByUsername,
  apiUpdatePost,
} from "data-source/posts";
import {
  apiDeleteFollow,
  apiFollowOtherUser,
  apiGetListFollower,
  apiGetListFollowing,
  apiGetUserByUserName,
  apiUnFollowOtherUser,
  apiUploadAvatar,
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
  DELETE_POST,
  DELETE_POST_SUCCESS,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  GET_DETAIL_USER_BY_USERNAME,
  GET_DETAIL_USER_BY_USERNAME_SUCCESS,
  UPDATE_AVATAR,
  UPDATE_AVATAR_SUCCESS,
  GET_LIST_COMMENT_BY_POST,
  CREATE_NEW_COMMENT,
  CREATE_NEW_COMMENT_SUCCESS,
  GET_LIST_COMMENT_BY_POST_SUCCESS,
  LIKE_A_POST,
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
      ...payload,
    });
    if (createPostRes.state === REQUEST_STATE.SUCCESS) {
      yield put(CREATE_POST_SUCCESS(createPostRes.data));
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* deletePost({ type, payload }) {
  const { id } = payload;
  try {
    const deletePostRes = yield call(apiDeletePost, id);
    console.log("deletePostRes: ", deletePostRes);
    if (deletePostRes.state === REQUEST_STATE.SUCCESS) {
      console.log("deletePostRes2: ", deletePostRes);
      yield put(DELETE_POST_SUCCESS({ id }));
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* editPost({ type, payload }) {
  const { post } = payload;
  try {
    let newListImage = [];
    for (let i = 0; i < post?.medias?.fileList.length; i++) {
      if (
        post?.medias?.fileList[i].originFileObj &&
        post?.medias?.fileList[i].thumbUrl
      ) {
        const imgUploadRes = yield call(
          apiUploadMedia,
          post?.medias?.fileList[i].originFileObj
        );
        if (imgUploadRes?.data?.url) {
          newListImage.push(imgUploadRes.data.id);
        }
      } else {
        newListImage.push(post?.medias?.fileList[i].id);
      }
    }
    const response = yield call(apiUpdatePost, post.id, {
      content: post.content,
      mediaIds: newListImage,
      config: '{"privacy":"audience.public"}',
    });
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(EDIT_POST_SUCCESS({ posts: response.data }));
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* getDetailUserByUsername({ type, payload }) {
  const { username } = payload;
  console.log("username: ", username);
  try {
    const response = yield call(apiGetUserByUserName, username);
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(GET_DETAIL_USER_BY_USERNAME_SUCCESS(response.data));
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* updateAvatar({ type, payload }) {
  const { newAvatar } = payload;
  try {
    const uploadAvatarRes = yield call(apiUploadMedia, newAvatar);
    const response = yield call(apiUploadAvatar, {
      avatarUrl: uploadAvatarRes.data.url,
    });
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(UPDATE_AVATAR_SUCCESS({ avatarUrl: uploadAvatarRes.data.url }));
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* getListCommentByPost({ type, payload }) {
  const { id, page, size } = payload;
  try {
    const response = yield call(apiGetListCommentByPost, id, { page, size });
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(
        GET_LIST_COMMENT_BY_POST_SUCCESS({
          comments: response.data ?? [],
          total: response?.total,
        })
      );
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* createNewComment({ type, payload }) {
  const { comment } = payload;
  try {
    const commentParams = { ...comment };
    delete commentParams.user;
    delete commentParams.commentId;
    const response = yield call(apiCreateComment, commentParams);
    console.log("response: ", response);
    // if (response.state === REQUEST_STATE.SUCCESS) {
    yield put(
      CREATE_NEW_COMMENT_SUCCESS({
        comment: response.data ?? comment,
        commentId: comment.commentId,
      })
    );
    // }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* likeAPost({ type, payload }) {
  const { postId } = payload;
  try {
    const response = yield call(apiAddLike, { postId });
  } catch (error) {
    console.log("error: ", error);
  }
}

function* getLikesOfPosts({ type, payload }) {
  const { postId } = payload;
  try {
    const response = yield call(apiGetLike, postId);
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
  yield takeLatest(DELETE_POST().type, deletePost);
  yield takeLatest(EDIT_POST().type, editPost);
  yield takeLatest(GET_DETAIL_USER_BY_USERNAME().type, getDetailUserByUsername);
  yield takeLatest(UPDATE_AVATAR().type, updateAvatar);
  yield takeLatest(GET_LIST_COMMENT_BY_POST().type, getListCommentByPost);
  yield takeEvery(LIKE_A_POST().type, likeAPost);
  yield takeEvery(CREATE_NEW_COMMENT().type, createNewComment);
}
