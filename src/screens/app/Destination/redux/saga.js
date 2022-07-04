import { put, takeLatest, call } from "@redux-saga/core/effects";
import { REQUEST_STATE } from "configs";
import { apiGetListCommentByDestination } from "data-source/comment";
import { apiGetAnalyzeStarsByDestination, apiGetDetailDestination } from "data-source/destination";
import { apiGetTopHotelByDestination } from "data-source/hotel";
import { GET_DETAIL_LOCATION, GET_DETAIL_LOCATION_SUCCESS, GET_TOP_HOTELS_BY_DESTINATION, GET_TOP_HOTELS_BY_DESTINATION_FAIL, GET_TOP_HOTELS_BY_DESTINATION_SUCCESS } from "./action";

function* getDetailLocation({ type, payload }) {
  const { id } = payload;
  try {
    const response = yield call(apiGetDetailDestination, id);
    const listComment = yield call(apiGetListCommentByDestination, id);
    const analyzeCommentStars = yield call(apiGetAnalyzeStarsByDestination, id);
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(
        GET_DETAIL_LOCATION_SUCCESS({
          location: { 
            ...response.data, 
            listComment: listComment?.data,
            analyzeComments: analyzeCommentStars.data,
          },
        })
      );
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function* getTopHotelsByDestination({ type, payload }) {
  const { destinationId, page, size } = payload;
  try {
    const response = yield call(apiGetTopHotelByDestination, { destinationId, page, size });
    if (response.state === REQUEST_STATE.SUCCESS) {
      yield put(GET_TOP_HOTELS_BY_DESTINATION_SUCCESS({
        data: response?.data
      }));
    } else {
      yield put(GET_TOP_HOTELS_BY_DESTINATION_FAIL());
    }
  } catch (error) {
    console.log('error: ', error);
  }
}

export default function* locationSaga() {
  yield takeLatest(GET_DETAIL_LOCATION().type, getDetailLocation);
  yield takeLatest(GET_TOP_HOTELS_BY_DESTINATION().type, getTopHotelsByDestination);
}
