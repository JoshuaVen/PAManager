import { createReducer } from '@reduxjs/toolkit'
import * as animeDetails from './actions'

const initialState = {
    requesting: false,
    data: null,
    message: null
}

const animeReducer = createReducer(initialState, {
    [animeDetails.req]: (state) => {
        state.requesting = true
    },
    [animeDetails.res]: (state, action) => {
        state.requesting = false
        state.message = 'successful'
        state.data = action.payload
    },
    [animeDetails.err]: (state, action) => {
        state.requesting = false
        state.message = action.payload
    }
})

export default animeReducer
