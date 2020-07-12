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

    render() {
        const { handleSubmit } = this.props

        return (
            <div className='login'>
                <div className='page-title'>
                    <span>Sign In</span>
                </div>
                <div className='signin-form'>
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
                    {this.props.signin.signinInitialized ? (<p>Signing in...</p>) : (<p>Done</p>)}
                    {this.props.signin.token ? (<p>{this.props.signin.token}</p>) : null}
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
