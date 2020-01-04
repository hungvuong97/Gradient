import { takeEvery, call, put, takeLatest } from 'redux-saga/effects';
import { DATA_REQUESTED, DATA_LOADED, API_ERRORED } from '../action/action';
import axios from 'axios';
export default function* watcherSaga() {
    yield takeLatest(DATA_REQUESTED, workerSaga);
}

function* workerSaga() {
    try {
        const payload = yield call(axios.get, "http://localhost:5000/user");
        yield put({ type: DATA_LOADED, payload });
    } catch (e) {
        // yield put({ type: API_ERRORED, payload: e })
    }
}