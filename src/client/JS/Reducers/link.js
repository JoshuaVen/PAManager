import { TOGGLE_LINKING, INITIATE_LINKING, LINKING_SUCCESS, LINKING_FAIL, RESET_LINKING } from 'Client/JS/Actions/linking'
import produce from 'immer'

const initialState = {
    isLinking: false,
    referenceItem: '',
    toBeLinked: {},
    message: null,
    linkingStarted: false,
    linkingSuccess: false,
}

const link = produce((draft, action) => {
    switch (action.type) {
        case TOGGLE_LINKING:
            draft.isLinking = !draft.isLinking
            break
        case INITIATE_LINKING:
            draft.toBeLinked = action.payload.toBeLinked
            draft.referenceItem = action.payload.referenceItem
            draft.linkingStarted = true
            break
        case LINKING_SUCCESS:
            draft.linkingStarted = false
            draft.linkingSuccess = true
            draft.message = action.payload
            break
        case LINKING_FAIL:
            draft.isLinking = false
            draft.linkingStarted = false
            draft.linkingSuccess = false
            draft.message = action.payload
            break;
        case RESET_LINKING:
            draft.isLinking = false
            draft.referenceItem = ''
            draft.toBeLinked = {}
            draft.message = null
            draft.linkingStarted = false
            draft.linkingSuccess = false
            break
    }
}, initialState)

export default link
