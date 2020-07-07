import React from 'react'
import { Provider } from 'react-redux'

import configureStore from './Stores/App'

const appStore = configureStore()

export default (props) => {
    return (
        <Provider store={appStore}>
            {props.children}
        </Provider>
    )
}
