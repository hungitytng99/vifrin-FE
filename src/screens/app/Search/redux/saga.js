import { REQUEST_STATE } from "configs";
import { apiSearchUserAndDestination } from "data-source/search";
import { SEARCH_BY_KEY, SEARCH_BY_KEY_FAIL, SEARCH_BY_KEY_SUCCESS } from "./action";
import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";

function* searchByKey({ type, payload }) {
    const { key } = payload;
    try {
        const response = yield call(apiSearchUserAndDestination, { key });
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(SEARCH_BY_KEY_SUCCESS({
                data: response?.data
            }));
        } else {
            yield put(SEARCH_BY_KEY_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* searchSaga() {
    yield takeLatest(SEARCH_BY_KEY().type, searchByKey);
}
