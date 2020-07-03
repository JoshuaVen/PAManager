import {
    POP_FORM,
    ADD_ANIME,
    UNDO_FORM,
    CONNECT_TO_MAL,
    DISCONNECT_FROM_MAL
} from './types'

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
