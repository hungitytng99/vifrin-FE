import { REQUEST_STATE } from "configs";
import { apiGetExploreDestinations } from "data-source/destination";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_EXPLORE_DESTINATIONS, GET_EXPLORE_DESTINATIONS_FAIL, GET_EXPLORE_DESTINATIONS_SUCCESS } from "./action";

function* getExploreDestinations({ type, payload }) {
    const { page, size } = payload;
    try {
        const response = yield call(apiGetExploreDestinations, { page, size });
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(GET_EXPLORE_DESTINATIONS_SUCCESS({
                data: response?.data
            }));
        } else {
            yield put(GET_EXPLORE_DESTINATIONS_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* loginSaga() {
    yield takeLatest(GET_EXPLORE_DESTINATIONS().type, getExploreDestinations);
 }
