import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { isString, isEmpty, isFunction } from 'lodash'
import invariant from 'invariant'
import { ReactReduxContext } from 'react-redux';

function checkParams(key, reducer) {
    invariant(
        isString(key) && !isEmpty(key) && isFunction(reducer),
        '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    );
}

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
// { key, reducer }
export default ({ key, reducer }) => WrappedComponent => {

    checkParams(key, reducer)

    class ReducerInjector extends React.Component {
        static WrappedComponent = WrappedComponent;

        static contextType = ReactReduxContext;

        static displayName = `withReducer(${WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component'})`;

        constructor(props, context) {
            super(props, context)
        }

        componentDidMount() {
            let reducerManager = this.context.store.reducerManager
            if (
                Reflect.has(reducerManager.getReducerMap(), key) &&
                store.injectedReducers[key] === reducer
            ) {
                return
            } else {
                reducerManager.add(key, reducer)
                this.context.store.replaceReducer(reducerManager.reduce)
            }
        }

        componentWillUnmount() {
            let reducerManager = this.context.store.reducerManager
            reducerManager.remove(key)
            this.context.store.replaceReducer(reducerManager.reduce)
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
