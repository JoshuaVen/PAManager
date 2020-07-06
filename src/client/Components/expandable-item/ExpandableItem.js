import React from 'react'
import { connect } from 'react-redux'

import { searchAnime, activateItem } from 'Client/JS/Actions/index'
import { toggleLinking } from 'Client/JS/Actions/linking'

import './ExpandableItem.css'


class ExpandableItem extends React.Component {

    handleClick() {
        this.props.searchAnime(this.props.animeTitle)
        this.props.activateItem(this.props.index)
        this.props.toggleLinking()
    }

    render() {
        return (
            <div
                className='expandable-item'
                onClick={() => this.handleClick()}
            >
                <p>{this.props.animeTitle}</p>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        currentActive: state.list.currentActive
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleLinking: toggle => dispatch(toggleLinking(toggle)),
        activateItem: index => dispatch(activateItem(index)),
        searchAnime: title => dispatch(searchAnime(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpandableItem)
