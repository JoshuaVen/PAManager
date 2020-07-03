import { ADD_ANIME } from 'Client/JS/Actions/types'

const initialState = [
    '犬夜叉',
    '境界のRinne',
    'To LOVE Ru'
]

function list(state = initialState, action) {
    switch (action.type) {
        case ADD_ANIME:
            return [
                ...state,
                action.payload
            ]
        default:
            return state
    }
}

export default list
