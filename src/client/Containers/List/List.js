import React from 'react'
import { connect } from 'react-redux'

import { request } from 'Client/JS/Actions/downloaded'

import Item from 'Client/Components/item/Item'
import ExpandableItem from 'Client/Components/expandable-item/ExpandableItem'
import './List.css'

class List extends React.Component {

    render() {
        return (
            <div className='list'>
                {this.props.dledAnime.associatedDocs.map(
                    (anime, index) =>
                        <Item anime={anime} key={index} />
                )}
                {this.props.dledAnime.unAssociated.map(
                    (anime, index) =>
                        <ExpandableItem anime={anime} key={index} index={index} />
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
        fetchDownloadedAnime: dispatch(request())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
