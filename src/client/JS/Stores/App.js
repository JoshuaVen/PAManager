import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import reduxPromise from 'redux-promise'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from '../Reducers'
import rootSaga from '../Sagas'


export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()

    const middlewares = [sagaMiddleware, reduxPromise, logger]
    const middlewareEnhancers = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancers]
    const composedEnhancers = composeWithDevTools(...enhancers)


    const store = createStore(
        rootReducer, composedEnhancers
    )

    sagaMiddleware.run(rootSaga)

    return store
}
