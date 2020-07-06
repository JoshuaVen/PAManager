import { SEARCH_ANIME, SEARCH_RESULT_RECEIVED, SEARCH_RESULT_ERRORED } from '../Actions/types'

const initialState = {
    errorOccured: false,
    errorMessage: null,
    loading: false,
    searchRes: [],
    searchTitle: ''
}

function searchList(state = initialState, action) {
    switch (action.type) {
        case SEARCH_ANIME:
            return {
                ...state,
                searchTitle: action.payload,
                loading: true
            }
        case SEARCH_RESULT_RECEIVED:
            return {
                ...state,
                loading: false,
                searchRes: action.payload.data
            }
        case SEARCH_RESULT_ERRORED:
            return {
                ...state,
                errorOccured: true,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export default searchList
