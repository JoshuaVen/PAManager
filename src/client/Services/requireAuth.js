import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { connect } from 'react-redux'

export default ChildComponent => {
    class ComposedComponent extends React.Component {
        componentDidMount() {
            this.shouldNavigateAway()
        }

        componentDidUpdate() {
            this.shouldNavigateAway()
        }

        shouldNavigateAway() {
            if (!this.props.auth) {
                this.props.history.push('/signin')
            }
        }

        render() {
            return <ChildComponent {...this.props} />
        }
    }

    const mapStateToProps = state => {
        return {
            auth: state.authReducer.token
        }
    }

    return hoistNonReactStatics(connect(mapStateToProps)(ComposedComponent), ChildComponent)
}
