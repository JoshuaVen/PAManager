import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './header.css'

class Header extends React.Component {

    render() {
        return (
            <div className='header-body'>
                <Link className='PAManager' to='/'>PAManager</Link>
                <div className='connect'>
                    <Link to='/auth'>Connect To MAL</Link>
                    {this.props.auth.token ?
                        (<Link to='/signout'>Sign Out</Link>) :
                        (<Link to='/signin'>Sign In</Link>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer
    }
}

export default connect(mapStateToProps)(Header)
