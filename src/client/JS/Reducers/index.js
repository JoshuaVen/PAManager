import { combineReducers } from 'redux'
import header from './header'
import list from './list'
import form from './form'
import searchList from './searchlist'
import link from './link'

export default combineReducers({
    header,
    list,
    form,
    searchList,
    link
})
