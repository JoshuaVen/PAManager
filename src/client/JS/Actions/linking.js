export const TOGGLE_LINKING = 'toggle_linking'
export const INITIATE_LINKING = 'initiate_linking'
export const LINKING_SUCCESS = 'linking_successful'
export const LINKING_FAIL = 'linking failed'

export function toggleLinking(toggle) {
    return {
        type: TOGGLE_LINKING,
        payload: toggle
    }
}

export function initiateLinking(toBeLinked) {
    return {
        type: INITIATE_LINKING,
        payload: toBeLinked
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
