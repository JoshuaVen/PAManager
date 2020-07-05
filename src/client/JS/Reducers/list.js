import { ADD_ANIME, FETCH_DLED_ANIME, ACTIVE_ITEM } from 'Client/JS/Actions/types'

const initialState = {
    currentActive: null,
    dledAnime: []
}

function list(state = initialState, action) {
    switch (action.type) {
        case ADD_ANIME:
            return {
                ...state,
                dledAnime: [...state.dledAnime, action.payload]
            }
        case FETCH_DLED_ANIME:
            const dledAnime = action.payload.data.docs.map(anime => anime)
            return {
                ...state,
                dledAnime: [...dledAnime]
            }
        case ACTIVE_ITEM:
            return {
                ...state,
                currentActive: action.payload
            }
        default:
            return state
    }
}

export default list
