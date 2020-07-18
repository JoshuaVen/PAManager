import { call, put, takeLatest, select } from 'redux-saga/effects'
import axios from 'axios'

import * as fetchDled from './actions'

function fetchDledAnime() {
    const token = localStorage.getItem('token')
    const config = {
        method: 'get',
        url: 'http://localhost:8080/api/files/downloaded_list',
        headers: {
            authorization: token
        }
    }
    return axios(config)
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

function* fetchDledResults() {

    const { error, response } = yield call(fetchDledAnime)
    if (error) {
        console.log(error)
        yield put(fetchDled.failed(error))
    } else {
        yield put(fetchDled.success(response))
    }
}

function* fetchingWatcher() {
    yield takeLatest(fetchDled.request, fetchDledResults)
}

export default fetchingWatcher
