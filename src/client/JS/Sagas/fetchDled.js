import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import * as fetchDled from '../Actions/downloaded'

function fetchDledAnime() {
    return axios.get('http://localhost:8080/api/files/downloaded_list')
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

function* fetchDledResults() {
    const { error, response } = yield call(fetchDledAnime)
    if (error) {
        yield put(fetchDled.failed(error))
    } else {
        yield put(fetchDled.success(response))
    }
}

function* fetchingWatcher() {
    yield takeLatest(fetchDled.request, fetchDledResults)
}

export default fetchingWatcher
