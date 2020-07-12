import React from 'react'
import { Link } from 'react-router-dom'

import './header.css'

class Header extends React.Component {
    render() {
        return (
            <div className='header-body'>
                <Link className='PAManager' to='/'>PAManager</Link>
                <div className='connect'>
                    <Link to='/auth'>Connect To MAL</Link>
                    <Link to='/signin'>Sign In</Link>
                </div>
            </div>
        )
    }
}

export default Header
