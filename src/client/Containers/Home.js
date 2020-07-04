import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import SideNav from 'Client/Components/side-nav/SideNav'
import Header from 'Client/Components/header/Header'
import List from 'Client/Components/list/List'
import PopupForm from 'Client/Components/form/PopupForm'

class Home extends React.Component {
    render() {
        return (
            <div className='home'>
                {this.props.isConnectedToMAL ? <SideNav /> : null}
                <Header />
                {this.props.form.isPopped ? <PopupForm /> : null}
                <List />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        form: state.form,
        isConnectedToMAL: state.header.isConnectedToMAL
    }
}


export default connect(mapStateToProps)(Home);
