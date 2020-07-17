import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
// import auth from './auth'
import header from './header'
import list from './list'
import form from './form'
import searchList from './searchlist'
import link from './link'

export const staticReducers = {
    // header,
    // list,
    // form: formReducer,
    // searchList,
    // link,
    // auth
}

export default combineReducers(staticReducers)
