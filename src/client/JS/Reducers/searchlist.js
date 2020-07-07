import { SEARCH_ANIME, SEARCH_RESULT_RECEIVED, SEARCH_RESULT_ERRORED } from '../Actions/types'
import produce from 'immer'

const initialState = {
    errorOccured: false,
    errorMessage: null,
    loading: false,
    searchRes: [],
    searchTitle: ''
}

const searchList = produce((draft, action) => {
    switch (action.type) {
        case SEARCH_ANIME:
            draft.searchTitle = action.payload
            draft.loading = true
            break

        case SEARCH_RESULT_RECEIVED:
            draft.loading = false
            draft.searchRes = action.payload.data
            break

        case SEARCH_RESULT_ERRORED:
            draft.errorOccured = true
            draft.errorMessage = action.payload
            break

    }
}, initialState)

export default searchList
