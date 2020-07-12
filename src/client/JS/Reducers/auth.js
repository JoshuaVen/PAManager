import { createReducer } from '@reduxjs/toolkit'
import * as signin from '../Actions/signin'

const initialState = {
    signinInitialized: false,
    token: null,
    authenticated: '',
    errorMessage: null
}

const authReducer = createReducer(initialState, {
    [signin.request]: (state) => { state.signinInitialized = true },
    [signin.success]: (state, action) => {
        state.signinInitialized = false
        state.token = action.payload.data.token
        state.errorMessage = null
    },
    [signin.failed]: (state, action) => {
        state.signinInitialized = false
        state.errorMessage = action.payload
        state.token = null
    }
})

export default authReducer
