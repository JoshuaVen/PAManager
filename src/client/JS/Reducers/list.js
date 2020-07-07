import { ADD_ANIME, FETCH_DLED_ANIME, ACTIVE_ITEM } from 'Client/JS/Actions/types'
import produce from 'immer'

const initialState = {
    currentActive: null,
    dledAnime: []
}

const list = produce((draft, action) => {
    switch (action.type) {
        case ADD_ANIME:
            draft.dledAnime = [...state.dledAnime, action.payload]
            break

        case FETCH_DLED_ANIME:
            const dledAnime = action.payload.data.docs.map(anime => anime)
            draft.dledAnime = dledAnime
            break

        case ACTIVE_ITEM:
            draft.currentActive = action.payload
            break

    }
}, initialState)

export default list
