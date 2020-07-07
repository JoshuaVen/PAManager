import { call, put, all, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import * as linkingProcess from '../Actions/linking'

function linkAttempt(item) {
    const dataForPosting = {
        ...item.toBeLinked,
        searchTitle: item.referenceItem
    }
    const linkingURL = 'http://localhost:8080/api/files/link'
    const config = {
        method: 'POST',
        url: linkingURL,
        data: dataForPosting
    }
    return axios(config)
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

function* fetchLinkResults(toBeLinked) {
    const { response, error } = yield call(linkAttempt, toBeLinked.payload)
    if (response) {
        yield put(linkingProcess.linkingSuccessful(response))
    } else {
        yield put(linkingProcess.linkingFailed(error))
    }
}

function* linkingWatcher() {
    yield takeLatest(linkingProcess.INITIATE_LINKING, fetchLinkResults)
}

export default linkingWatcher
