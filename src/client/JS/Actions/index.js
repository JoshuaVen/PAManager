import {
    POP_FORM,
    ADD_ANIME,
    UNDO_FORM,
    CONNECT_TO_MAL,
    DISCONNECT_FROM_MAL,
    SEARCH_ANIME,
    SEARCH_RESULT_RECEIVED,
    SEARCH_RESULT_ERRORED,
    ACTIVE_ITEM,
} from './types'

export function activateItem(item) {
    return {
        type: ACTIVE_ITEM,
        payload: item
    }
}

export function searchResultErrored(error) {
    return {
        type: SEARCH_RESULT_ERRORED,
        paylad: error
    }
}

export function searchResultReceived(result) {
    return {
        type: SEARCH_RESULT_RECEIVED,
        payload: result
    }
}

export function searchAnime(title) {
    return {
        type: SEARCH_ANIME,
        payload: title
    }
}

export function addAnime(anime) {
    return {
        type: ADD_ANIME,
        payload: anime
    }
}

export function popForm(pop) {
    return {
        type: POP_FORM,
        payload: pop
    }
}

export function undoForm(unpop) {
    return {
        type: UNDO_FORM,
        payload: unpop
    }
}

export function connectToMal(connect) {
    return {
        type: CONNECT_TO_MAL,
        payload: connect
    }
}

export function disconnectFromMal(disconnect) {
    return {
        type: DISCONNECT_FROM_MAL,
        payload: disconnect
    }
}
