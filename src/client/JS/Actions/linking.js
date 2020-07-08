export const TOGGLE_LINKING = 'toggle_linking'
export const INITIATE_LINKING = 'initiate_linking'
export const LINKING_SUCCESS = 'linking_successful'
export const LINKING_FAIL = 'linking failed'
export const RESET_LINKING = 'reset_linking_state'

export function resetLinking(reset) {
    return {
        type: RESET_LINKING,
        payload: reset
    }
}

export function toggleLinking(toggle) {
    return {
        type: TOGGLE_LINKING,
        payload: toggle
    }
}

export function initiateLinking(toBeLinked, referenceItem) {
    return {
        type: INITIATE_LINKING,
        payload: {
            toBeLinked,
            referenceItem
        }
    }
}

export function linkingSuccessful(successMessage) {
    return {
        type: LINKING_SUCCESS,
        payload: successMessage
    }
}

export function linkingFailed(failedMessage) {
    return {
        type: LINKING_FAIL,
        payload: failedMessage
    }
}
