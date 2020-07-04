import { ADD_ANIME, FETCH_DLED_ANIME } from 'Client/JS/Actions/types'

function list(state = [], action) {
    switch (action.type) {
        case ADD_ANIME:
            return [
                ...state,
                action.payload
            ]
        case FETCH_DLED_ANIME:
            const dledAnime = action.payload.data.docs.map(anime => anime.title)
            return [...state, ...dledAnime]
        default:
            return state
    }
}

export default list
