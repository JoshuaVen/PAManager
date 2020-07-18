import * as downloaded from './actions'
import { createReducer } from '@reduxjs/toolkit'

const listInitialState = {
    isFetching: false,
    currentActive: null,
    dledAnime: {
        associatedDocs: [],
        unAssociated: []
    },
    errorMessage: ''
}

const listReducer = createReducer(listInitialState, {
    [downloaded.request]: (state) => { state.isFetching = true },
    [downloaded.success]: (state, action) => {
        state.isFetching = false
        state.dledAnime = action.payload.data
    },
    [downloaded.failed]: (state, action) => {
        state.isFetching = false
        state.errorMessage = action.payload
    }
})

export default listReducer

const searchInitialState = {
    errorOccured: false,
    errorMessage: null,
    loading: false,
    searchRes: [],
    searchTitle: ''
}

export const searchReducer = createReducer(searchInitialState, {
    [downloaded.search_req]: (state, action) => {
        state.searchTitle = action.payload
        state.loading = true
    },
    [downloaded.search_rec]: (state, action) => {
        state.loading = false
        state.searchRes = action.payload.data
    },
    [downloaded.search_err]: (state, action) => {
        state.errorOccured = true
        state.errorMessage = action.payload
    }
})
