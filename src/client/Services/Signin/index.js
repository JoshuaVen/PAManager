import React from 'react'
import { reduxForm, Field, reducer as formReducer } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import * as signin from './actions'

import injectReducer from 'Client/Utils/injectReducer'
import injectSaga from 'Client/Utils/injectSaga'

import signinSaga from './saga'

import { FaTimes } from 'react-icons/fa'
import Loading2 from 'Client/Assets/loading2.svg'

import './signin.css'
import './signin-error.css'

class Signin extends React.Component {

    onSubmit = formProps => {
        const { history } = this.props
        this.props.signinRequest({ formProps, history })
    }

    componentDidMount() {
        if (this.props.signin.token) {
            this.props.history.push('/auth')
        }
    }

    componentDidUpdate() {
        if (this.props.signin.token) {
            this.props.history.push('/auth')
        }
    }

    render() {
        const { handleSubmit } = this.props

        const signinForm = (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset className='si-input-container'>
                    <label className='si-label name'>
                        <span className='si-span name'>Name</span>
                    </label>
                    <Field
                        className='si-input-box name'
                        name='name'
                        type='text'
                        component='input'
                        autoComplete='off'
                    />
                </fieldset>
                <fieldset className='si-input-container'>
                    <label className='si-label pw'>
                        <span className='si-span pw'>Password</span>
                    </label>
                    <Field
                        className='si-input-box pw'
                        name='password'
                        type='password'
                        component='input'
                        autoComplete='none'
                    />
                </fieldset>
                <div className='si-submit'>
                    {this.props.signin.initialized ? (
                        <Loading2 className='si-loading' />
                    ) : (
                            <button className='si-button'>Sign in</button>
                        )}
                </div>
            </form>
        )

        const showTimeoutTimer = (
            <div>
                <p style={{ color: 'black' }}>
                    Sign-in on cooldown..
                </p>
                <p style={{ color: 'black' }}>{this.props.signin.timeout}</p>
            </div>
        )

        const signinError = (
            <div className='box error'>
                <div className='icon-container'>
                    <FaTimes className='error' />
                </div>
                <div className='message-container'>
                    <p>{this.props.signin.errorMessage}</p>
                </div>
            </div>
        )

        return (
            <div className='login'>
                <div className='page-title'>
                    <span>Sign In</span>
                </div>
                <div className='signin-form'>
                    <div className='signin-form-container'>
                        {this.props.signin.attemptExceeded ? showTimeoutTimer : signinForm}
                    </div>
                    {this.props.signin.errorMessage ? (signinError) : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        signin: state.authReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signinRequest: formProps => dispatch(signin.request(formProps))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({ form: 'signinForm' }),
    injectReducer({ key: 'form', reducer: formReducer }),
    injectSaga({ key: 'signin', saga: signinSaga }),
)(Signin)
