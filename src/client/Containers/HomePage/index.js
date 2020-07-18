import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import requireAuth from 'Client/Services/requireAuth'
import injectReducer from 'Client/Utils/injectReducer'
import loadable from 'Client/Utils/loadable'

import homeReducer from './reducer'
import Header from 'Client/Components/header'
import LoadingComp from 'Client/Components/loading-component/Loading'
const List = loadable(() => import(/* webpackPreload: true */ 'Client/Containers/List'), {
    fallback: <LoadingComp />
})
import AnimeLinking from 'Client/Components/anime-linking'

const pages = [
    { title: 'Anime', description: 'All anime displayed that are added by the user' },
    { title: 'Completed', description: 'Titles that are finished watching' },
    { title: 'Currently Watching', description: 'Titles that are currently being watched' },
    { title: 'Plan To Watch', description: 'Titles that are to be watched' },
    { title: 'Downloaded', description: 'Titles that added to the local device for watching' },
]

class Home extends React.Component {

    render() {
        return (
            <div className='home'>
                {/*
                {this.props.isConnectedToMAL ? <SideNav /> : null}

                {this.props.form.isPopped ? <PopupForm /> : null}
                 */}
                {this.props.isLinking ? <AnimeLinking /> : null}
                {this.props.home ? <Header pages={pages} currentActive={this.props.home.currentActive} /> : <div>loading...</div>}
                <List />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        home: state.home,
        isLinking: state.link ? state.link.isLinking : null
    }
}

export default compose(
    connect(mapStateToProps),
    injectReducer({ key: 'home', reducer: homeReducer }),
    requireAuth
)(Home)
