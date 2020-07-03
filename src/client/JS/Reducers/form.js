import { POP_FORM, UNDO_FORM } from 'Client/JS/Actions/types'

const initial_state = {
    isPopped: false
}

function form(state = initial_state, action) {
    switch (action.type) {
        case POP_FORM:
            return {
                ...state,
                isPopped: true
            }
        case UNDO_FORM:
            return {
                ...state,
                isPopped: false
            }
        default:
            return state;
    }
}

export default form
