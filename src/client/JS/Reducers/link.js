import { TOGGLE_LINKING, INITIATE_LINKING, LINKING_SUCCESS, LINKING_FAIL } from 'Client/JS/Actions/linking'
import produce from 'immer'

const initialState = {
    isLinking: false,
    referenceItem: '',
    toBeLinked: {},
    message: '',
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
            draft.isLinking = false
            draft.linkingStarted = false
            draft.linkingSuccess = true
            draft.message = action.payload
            break
        case LINKING_FAIL:
            isLinking = false
            linkingStarted = false
            linkingSuccess = false
            message = action.payload
            break;
    }
}, initialState)

export default link
