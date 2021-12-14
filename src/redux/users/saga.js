import { call, put, takeLatest } from "@redux-saga/core/effects";
import Cookies from "js-cookie";
import { AVATAR_DEFAULT, REMEMBER_ACCOUNT_KEY, REQUEST_STATE } from "configs";
import { apiLogin, apiSignUp, apiUploadAvatar } from "data-source/users";
import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "./action";

function* handleLogin({ type, payload }) {
  const { account, originalAccount } = payload;
  try {
    const response = yield call(apiLogin, account);
    console.log("response: ", response);
    if (response.state === REQUEST_STATE.SUCCESS) {
      Cookies.set("token", response.data.access_token, { secure: true });
      if (originalAccount.remember) {
        localStorage.setItem(
          REMEMBER_ACCOUNT_KEY,
          JSON.stringify(originalAccount)
        );
      }
      yield put(LOGIN_SUCCESS(response.data));
    } else if (response.state === REQUEST_STATE.ERROR) {
      yield put(LOGIN_FAIL(response.data));
    }
    if (!originalAccount.remember) {
      localStorage.removeItem(REMEMBER_ACCOUNT_KEY);
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* handleRegister({ type, payload }) {
  const { account } = payload;
  try {
    const response = yield call(apiSignUp, account);
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield call(apiUploadAvatar, {
        avatarUrl: AVATAR_DEFAULT,
      });
      yield put(REGISTER_SUCCESS(response));
    } else if (response.state === REQUEST_STATE.ERROR) {
      yield put(REGISTER_FAIL(response));
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

export default function* userSaga() {
  yield takeLatest(LOGIN().type, handleLogin);
  yield takeLatest(REGISTER().type, handleRegister);
}
