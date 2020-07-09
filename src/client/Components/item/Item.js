import React from 'react'
import './Item.css'
import { FaCheck } from 'react-icons/fa'

class Item extends React.Component {
    render() {
        return (
            <div className='item'>
                <div className='item-icon'>
                    <FaCheck className='check' />
                </div>
                <div className='item-title'>
                    <p>{this.props.animeTitle}</p>
                </div>
            </div>
        )
    }
}

export default Item
