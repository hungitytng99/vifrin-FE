import { call, takeLatest } from "@redux-saga/core/effects";
// import { apiDetailUser } from "data-source/users";

function* handleTest(payload) {
  // console.log(payload);
  // const result = yield call(apiDetailUser());
  // console.log("result: ", result);
}

export default function* registerSaga() {
  yield takeLatest("REGISTER", handleTest);
}
