import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import header from './header'
import list from './list'
import form from './form'
import searchList from './searchlist'
import link from './link'

export default combineReducers({
    header,
    list,
    form: formReducer,
    searchList,
    link,
    auth
})
