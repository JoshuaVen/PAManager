import React from 'react'
import { connect } from 'react-redux'

import { searchAnime, activateItem } from 'Client/JS/Actions/index'

import './ExpandableItem.css'


class ExpandableItem extends React.Component {

    handleClick() {
        this.props.searchAnime(this.props.animeTitle)
        this.props.activateItem(this.props.index)
    }

    render() {
        return (
            <div
                className='expandable-item'
                onClick={() => this.handleClick()}
            >
                <p>{this.props.animeTitle}</p>
                {
                    this.props.index === this.props.currentActive ?
                        (
                            <div>
                                {this.props.loading ? <p>Loading...</p> :
                                    <ul>
                                        {this.props.searchRes.map((searchResult, index) =>
                                            <li key={index}>{searchResult.title}</li>
                                        )}
                                    </ul>
                                }
                            </div>
                        ) : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentActive: state.list.currentActive,
        loading: state.searchList.loading,
        searchRes: state.searchList.searchRes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        activateItem: index => dispatch(activateItem(index)),
        searchAnime: title => dispatch(searchAnime(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpandableItem)
