import React from 'react'
import { connect } from 'react-redux'

import { fetchDownloadedAnime } from 'Client/JS/Actions/index'

import ExpandableItem from 'Client/Components/expandable-item/ExpandableItem'
import './List.css'

class List extends React.Component {

    render() {
        return (
            <div className='downloaded-list'>
                {this.props.dledAnime.map(
                    (anime, index) =>
                        <ExpandableItem animeTitle={anime.title} key={index} index={index} />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dledAnime: state.list.dledAnime,
        searchResult: state.searchList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDownloadedAnime: dispatch(fetchDownloadedAnime())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
