import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import * as signin from 'Client/JS/Actions/signin'

import './signin.css'

class Signin extends React.Component {

    onSubmit = formProps => {
        const { history } = this.props
        this.props.signinRequest({ formProps, history })
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
                <fieldset>
                    <label>Name</label>
                    <Field
                        name='name'
                        type='text'
                        component='input'
                        autoComplete='none'
                    />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <Field
                        name='password'
                        type='password'
                        component='input'
                        autoComplete='none'
                    />
                </fieldset>
                <button>Sign up!</button>
            </form>
        )

        const showTimeoutTimer = (
            <div>
                <p>
                    Sign-in on cooldown..
                </p>
                <p>{this.props.signin.timeout}</p>
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
                    {this.props.signin.signinInitialized ? (<p>Signing in...</p>) : null}
                    {this.props.signin.errorMessage ? (<p>{this.props.signin.errorMessage}</p>) : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        signin: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signinRequest: formProps => dispatch(signin.request(formProps))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({ form: 'signin' })
)(Signin)
