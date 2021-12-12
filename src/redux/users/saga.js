import { call, put, takeLatest } from "@redux-saga/core/effects";
import Cookies from "js-cookie";
import { REQUEST_STATE } from "configs";
import { apiLogin } from "data-source/users";
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "./action";

function* handleLogin({ type, payload }) {
  try {
    const response = yield call(apiLogin, payload);
    console.log("response: ", response);
    if (response.state === REQUEST_STATE.SUCCESS) {
      Cookies.set("token", response.data.access_token, { secure: true });
      yield put(LOGIN_SUCCESS(response.data));
    } else if (response.state === REQUEST_STATE.ERROR) {
      yield put(LOGIN_FAIL(response.data));
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

export default function* userSaga() {
  yield takeLatest(LOGIN().type, handleLogin);
}
