import React from 'react'
import './Item.css'

class Item extends React.Component {
    render() {
        return (
            <div className='item'>
                <p>{this.props.animeTitle}</p>
            </div>
        )
    }
}

export default Item
