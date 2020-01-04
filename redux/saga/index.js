import { all, fork } from 'redux-saga/effects';
import * as saga from './saga';
export default function* rootSaga() {
    yield all(
        [...Object.values(saga)].map(fork)
    )
}