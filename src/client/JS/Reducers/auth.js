import { createReducer } from '@reduxjs/toolkit'
import * as signin from '../Actions/signin'

const initialState = {
    initialized: false,
    token: localStorage.getItem('token'),
    attempts: 5,
    attemptExceeded: false,
    errorMessage: null,
    timeout: 0
}

const authReducer = createReducer(initialState, {
    [signin.request]: (state) => { state.initialized = true },
    [signin.success]: (state, action) => {
        state.initialized = false
        state.token = action.payload.data.token
        state.errorMessage = null
    },
    [signin.failed]: (state, action) => {
        state.initialized = false
        state.errorMessage = action.payload
        state.token = null
        state.attempts = state.attempts - 1
    },
    [signin.deny]: (state) => {
        state.timeout = 20
        state.attemptExceeded = true
    },
    [signin.reallow]: (state) => {
        state.attempts = 5
        state.errorMessage = null
        state.attemptExceeded = false
        state.initialized = false
    },
    [signin.updateTimeout]: (state) => {
        state.timeout = state.timeout - 1
    }
})

export default authReducer
