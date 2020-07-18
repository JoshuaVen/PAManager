import React from 'react'
import { connect } from 'react-redux'

import { searchAnime } from 'Client/JS/Actions/index'
import { toggleLinking } from 'Client/JS/Actions/linking'

import { FaLink } from 'react-icons/fa'
import './ExpandableItem.css'


class ExpandableItem extends React.Component {

    handleClick() {
        this.props.searchAnime(this.props.anime.title)
        this.props.toggleLinking()
    }

    render() {
        return (
            <div className='expandable-item'
                onClick={() => this.handleClick()}
            >
                <div className='expandable-item-icon'>
                    <FaLink className='link' />
                </div>
                <div className='expandable-item-title'>
                    <p>{this.props.anime.title}</p>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        toggleLinking: toggle => dispatch(toggleLinking(toggle)),
        searchAnime: title => dispatch(searchAnime(title))
    }
}

export default connect(null, mapDispatchToProps)(ExpandableItem)
