import React from 'react'
import { connect } from 'react-redux'

import { search_req, link_togg } from 'Client/Containers/List/actions'

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
        toggleLinking: toggle => dispatch(link_togg(toggle)),
        searchAnime: title => dispatch(search_req(title))
    }
}

export default connect(null, mapDispatchToProps)(ExpandableItem)
