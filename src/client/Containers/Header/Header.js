import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './header.css'

export const HeaderHook = () => {
    const auth = useSelector(state => state.authReducer)

    return (
        <div className='header-body'>
            <Link className='PAManager' to='/'>PAManager</Link>
            <div className='connect'>
                <Link to='/auth'>Connect To MAL</Link>
                {auth.token ?
                    (<Link to='/signout'>Sign Out</Link>) :
                    (<Link to='/signin'>Sign In</Link>)}
            </div>
        </div>
    )
}

