import produce from 'immer'
import { POP_FORM, UNDO_FORM } from 'Client/JS/Actions/types'

const initial_state = {
    isPopped: false
}

const form = produce((draft, action) => {
    switch (action.type) {
        case POP_FORM:
            draft.isPopped = true
            break
        case UNDO_FORM:
            draft.isPopped = false
    }
}, initial_state)

export default form
