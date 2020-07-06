import { TOGGLE_LINKING, INITIATE_LINKING, LINKING_SUCCESS, LINKING_FAIL } from 'Client/JS/Actions/linking'

const initialState = {
    isLinking: false,
    toBeLinked: {},
    message: '',
    linkingStarted: false,
    linkingSuccess: false,
}

function link(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_LINKING:
            return {
                ...state,
                isLinking: !state.isLinking
            }
        case INITIATE_LINKING:
            return {
                ...state,
                toBeLinked: action.payload,
                linkingStarted: true,
            }
        case LINKING_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                isLinking: false,
                linkingStarted: false,
                linkingSuccess: true,
                message: action.payload
            }
        case LINKING_FAIL:
            return {
                ...state,
                isLinking: false,
                linkingStarted: false,
                linkingSuccess: false,
                message: action.payload
            }
        default:
            return state
    }
}

export default link
