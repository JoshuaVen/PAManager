import React from 'react'
import { connect } from 'react-redux'

import { signout } from 'Client/JS/Actions/signin'
import './signout.css'

class Signout extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.signout()
            this.props.history.push('/')
        }, 3000);
    }

    render() {
        return (
            <div className='signout'>
                <div className='signout-box'>
                    <span className='signout-text'>Signing out...</span>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signout: () => dispatch(signout())
    }
}

export default connect(null, mapDispatchToProps)(Signout)
