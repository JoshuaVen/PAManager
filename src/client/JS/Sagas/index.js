import { call, put, all, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { SEARCH_RESULT_RECEIVED, SEARCH_ANIME } from '../Actions/types'
import { searchResultReceived, searchResultErrored } from '../Actions/index'

import linkingWatcher from './linking'

function querySearch(searchURL) {
    return axios(searchURL)
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

function* fetchSearchResult(search) {
    const searchURL = 'http://localhost:8080/api/files/search?anime=' + search.payload
    const { response, error } = yield call(querySearch, searchURL)

    if (response) {
        yield put(searchResultReceived(response))
    } else {
        yield put(searchResultErrored(error))
    }

}

function* searchWatcher() {
    yield takeLatest(SEARCH_ANIME, fetchSearchResult)
}

export default function* rootSaga() {
    yield all([searchWatcher(), linkingWatcher()])
}
