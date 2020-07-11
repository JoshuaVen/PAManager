import React from 'react'
import { connect } from 'react-redux'

import { request } from 'Client/JS/Actions/downloaded'

import Item from 'Client/Components/item/Item'
import ExpandableItem from 'Client/Components/expandable-item/ExpandableItem'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import './List.css'
import { element } from 'prop-types'

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listHeight: 0,
            isLinkedExpanded: true,
            isNotLinkedExpanded: false,
        }
        this.handleClickLinked = this.handleClickLinked.bind(this)
        this.handleClickNotLinked = this.handleClickNotLinked.bind(this)
    }


    handleClickLinked() {
        this.setState({
            isLinkedExpanded: !this.state.isLinkedExpanded
        })
    }

    handleClickNotLinked() {
        this.setState({
            isNotLinkedExpanded: !this.state.isNotLinkedExpanded
        })
    }

    render() {
        return (
            <div className='list-main'>
                <div className='grouped'>
                    <span className='grouped-span'>Linked</span>
                    <div
                        className='grouped-icon'
                        onClick={this.handleClickLinked}
                    >
                        {this.state.isLinkedExpanded ? <FaChevronUp className='icon up' /> : <FaChevronDown className='icon down' />}
                    </div>
                </div>
                <div className={'list linked' + (this.state.isLinkedExpanded ? '' : ' collapse')}>
                    {this.props.dledAnime.associatedDocs.map(
                        (anime, index) =>
                            <Item anime={anime} key={index} />
                    )}
                </div>
                <div className='grouped'>
                    <span className='grouped-span'>Unlinked</span>
                    <div
                        className='grouped-icon'
                        onClick={this.handleClickNotLinked}
                    >
                        {this.state.isNotLinkedExpanded ? <FaChevronUp className='icon up' /> : <FaChevronDown className='icon down' />}
                    </div>
                </div>
                <div className={'list notlinked' + (this.state.isNotLinkedExpanded ? '' : ' collapse')}>
                    {this.props.dledAnime.unAssociated.map(
                        (anime, index) =>
                            <ExpandableItem anime={anime} key={index} index={index} />
                    )}
                </div>
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
