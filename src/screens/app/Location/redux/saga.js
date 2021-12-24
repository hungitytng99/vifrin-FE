import { put, takeLatest, call } from "@redux-saga/core/effects";
import { REQUEST_STATE } from "configs";
import { apiGetListCommentByDestination } from "data-source/comment";
import { apiGetDetailDestination } from "data-source/destination";
import { GET_DETAIL_LOCATION, GET_DETAIL_LOCATION_SUCCESS } from "./action";

function* getDetailLocation({ type, payload }) {
  const { id } = payload;
  try {
    const response = yield call(apiGetDetailDestination, id);
    const listComment = yield call(apiGetListCommentByDestination, id);
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(
        GET_DETAIL_LOCATION_SUCCESS({
          location: { ...response.data, listComment: listComment?.data },
        })
      );
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

export default function* locationSaga() {
  yield takeLatest(GET_DETAIL_LOCATION().type, getDetailLocation);
}
