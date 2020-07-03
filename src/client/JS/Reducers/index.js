import { combineReducers } from 'redux'
import header from './header'
import list from './list'
import form from './form'

export default combineReducers({
    header: header,
    list: list,
    form: form
})
