import React from 'react'
import { connect } from 'react-redux'

import { fetchDownloadedAnime } from 'Client/JS/Actions/index'

class List extends React.Component {

    render() {
        return (
            <ul>
                {this.props.dledAnime.map((animeTitle, index) => <li key={index}>{animeTitle}</li>)}
            </ul>
        )
    }
}

const mapStateToProps = state => {
    return {
        dledAnime: state.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDownloadedAnime: dispatch(fetchDownloadedAnime())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
