import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import * as signin from '../Actions/signin'

function fetchSigninResults(action) {
    return axios.post('http://localhost:8080/api/signin', action.payload.formProps)
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

function* signinResults(action) {
    const { error, response } = yield call(fetchSigninResults, action)
    if (error) {
        yield put(signin.failed('Entered credentials do not match!'))
    } else {
        yield call(action.payload.history.push, '/auth')
        yield put(signin.success(response))
    }
}

function* signinWatcher() {
    yield takeLatest(signin.request, signinResults)
}

export default signinWatcher
