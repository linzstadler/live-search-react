import {put, call, takeLatest} from 'redux-saga/effects';
import {
    FETCH_DETAIL_BEGIN,
} from './../constants/Detail.constants';
import {
    fetchListSuccess,
    listIsLoading,
} from './../actions/Detail.actions';
import axios from 'axios';
import {endpoint} from './../../../_shared/axios-proxy/setupProxy'
import {fetchListBegin} from "../../LiveSearch/actions/LiveSearch.action";

let CancelToken = axios.CancelToken.source()

export function fetchUser(value) {

    if (CancelToken) {
        CancelToken.cancel('cancelled');
        CancelToken = axios.CancelToken.source()
    }
    const result = endpoint.get(`/get-posts?term=${value}`, {
        cancelToken: CancelToken.token
    })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return null;
        });
    return result
}

export function* fetchDetail(action) {

    // yield put(listIsLoading(true));
    const result = yield call(fetchListBegin, action.value);
    if (result) {
        yield put(fetchListSuccess(result));

    }
    // yield put(listIsLoading(false));

}

export function* abortRequest() {
    if (CancelToken) {
        CancelToken.cancel('cancelled');
        CancelToken = axios.CancelToken.source()
    }

}

// All sagas to be loaded
export default [
    takeLatest(FETCH_DETAIL_BEGIN, fetchDetail),
    // takeLatest(ABORT_REQUEST, abortRequest),
];
