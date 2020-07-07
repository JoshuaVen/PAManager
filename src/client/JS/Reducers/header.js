import produce from 'immer'
import { CONNECT_TO_MAL, DISCONNECT_FROM_MAL } from 'Client/JS/Actions/types'

const initialState = {
    pages: [
        { title: 'Anime', description: 'All anime displayed that are added by the user' },
        { title: 'Completed', description: 'Titles that are finished watching' },
        { title: 'Currently Watching', description: 'Titles that are currently being watched' },
        { title: 'Plan To Watch', description: 'Titles that are to be watched' },
        { title: 'Downloaded', description: 'Titles that added to the local device for watching' },
    ],
    currentActive: 0,
    isConnectedToMAL: false
}

const header = produce((draft, action) => {
    switch (action.type) {
        case CONNECT_TO_MAL:
            draft.isConnectedToMAL = true
            break;
        case DISCONNECT_FROM_MAL:
            draft.isConnectedToMAL = false
    }
}, initialState)


export default header
