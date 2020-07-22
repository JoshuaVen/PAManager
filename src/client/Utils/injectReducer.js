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
export const useInjectReducer = ({ key, reducer }) => {
    checkParams(key, reducer)
    const context = React.useContext(ReactReduxContext)
    const reducerManager = context.store.reducerManager
    React.useEffect(() => {
        if (
            Reflect.has(reducerManager.getReducerMap(), key) &&
            context.store.injectedReducers[key] === reducer
        ) {
            return
        } else {
            reducerManager.add(key, reducer)
            context.store.replaceReducer(reducerManager.reduce)
        }
        return () => {
            reducerManager.remove(key)
            context.store.replaceReducer(reducerManager.reduce)
        }
    }, [])
}


// export default ({ key, reducer }) => WrappedComponent => {
//     checkParams(key, reducer)
//     class ReducerInjector extends React.Component {
//         static WrappedComponent = WrappedComponent;
//         static contextType = ReactReduxContext;
//         static displayName = `withReducer(${WrappedComponent.displayName ||
//             WrappedComponent.name ||
//             'Component'})`;
//         constructor(props, context) {
//             super(props, context)
//             this.reducerManager = context.store.reducerManager
//         }
//         componentDidMount() {
//             // let reducerManager = this.context.store.reducerManager
//             if (
//                 Reflect.has(this.reducerManager.getReducerMap(), key) &&
//                 this.context.store.injectedReducers[key] === reducer
//             ) {
//                 return
//             } else {
//                 this.reducerManager.add(key, reducer)
//                 this.context.store.replaceReducer(this.reducerManager.reduce)
//             }
//         }
//         componentWillUnmount() {
//             // let reducerManager = this.context.store.reducerManager
//             this.reducerManager.remove(key)
//             this.context.store.replaceReducer(this.reducerManager.reduce)
//         }
//         render() {
//             return <WrappedComponent {...this.props} />;
//         }
//     }
//     return hoistNonReactStatics(ReducerInjector, WrappedComponent);
// };
