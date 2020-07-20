import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import injectReducer from 'Client/Utils/injectReducer'
import injectSaga from 'Client/Utils/injectSaga'

import listReducer, { searchReducer, linkReducer } from './reducers'
import * as actions from './actions'
import listSaga from './saga'

import Item from 'Client/Components/item'
import ExpandableItem from 'Client/Components/expandable-item'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import './List.css'

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

    componentDidMount() {
        this.props.fetchDownloadedAnime()
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
                {this.props.list ? (
                    <div className={'list linked' + (this.state.isLinkedExpanded ? '' : ' collapse')}>
                        {this.props.list.dledAnime.associatedDocs.map(
                            (anime, index) =>
                                <Item anime={anime} key={index} history={this.props.history} />
                        )}
                    </div>
                ) : null}
                <div className='grouped'>
                    <span className='grouped-span'>Unlinked</span>
                    <div
                        className='grouped-icon'
                        onClick={this.handleClickNotLinked}
                    >
                        {this.state.isNotLinkedExpanded ? <FaChevronUp className='icon up' /> : <FaChevronDown className='icon down' />}
                    </div>
                </div>
                {this.props.list ? (
                    <div className={'list notlinked' + (this.state.isNotLinkedExpanded ? '' : ' collapse')}>
                        {this.props.list.dledAnime.unAssociated.map(
                            (anime, index) =>
                                <ExpandableItem anime={anime} key={index} index={index} />
                        )}
                    </div>
                ) : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDownloadedAnime: () => dispatch(actions.request())
    }
}

export default compose(
    injectReducer({ key: 'list', reducer: listReducer }),
    injectReducer({ key: 'search', reducer: searchReducer }),
    injectReducer({ key: 'link', reducer: linkReducer }),
    injectSaga({ key: 'listSaga', saga: listSaga }),
    connect(mapStateToProps, mapDispatchToProps)
)(List)
