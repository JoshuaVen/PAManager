import React from 'react'
import { connect } from 'react-redux'
import requireAuth from 'Client/Services/requireAuth'

class MalConnector extends React.Component {
    render() {
        return (
            <div className='auth-body'>
                <h1>This is the Auth page</h1>
            </div>
        )
    }
}

export default requireAuth(MalConnector)
