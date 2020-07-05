import { combineReducers } from 'redux'
import header from './header'
import list from './list'
import form from './form'
import searchList from './searchlist'

export default combineReducers({
    header: header,
    list: list,
    form: form,
    searchList: searchList
})
