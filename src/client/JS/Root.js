import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reduxPromise from 'redux-promise'
import reducers from './Reducers/index'
import rootSaga from './Sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware, reduxPromise)
)

sagaMiddleware.run(rootSaga)

export default (props) => {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}
