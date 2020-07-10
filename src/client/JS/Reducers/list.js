import * as fetch from 'Client/JS/Actions/downloaded'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    isFetching: false,
    currentActive: null,
    dledAnime: {
        associatedDocs: [],
        unAssociated: []
    },
    errorMessage: ''
}

const listReducer = createReducer(initialState, {
    [fetch.request]: (state) => { state.isFetching = true },
    [fetch.success]: (state, action) => {
        state.isFetching = false
        state.dledAnime = action.payload.data
    },
    [fetch.failed]: (state, action) => {
        state.isFetching = false
        state.errorMessage = action.payload.error
    }
})

export default listReducer
