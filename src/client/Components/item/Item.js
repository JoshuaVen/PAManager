import React from 'react'
import './Item.css'
import { FaCheck, FaUnlink, FaPlay, FaInfo } from 'react-icons/fa'

class Item extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpened: false
        }

        this.handleClick = this.handleClick.bind(this)
    }



    handleClick() {
        this.setState({
            isOpened: !this.state.isOpened
        })
    }

    render() {
        return (
            <div className={'item-default' + (this.state.isOpened ? ' advance' : '')} onClick={this.handleClick}>
                <div className={'item-advance' + (this.state.isOpened ? '' : ' hide')}>
                    <div className={'item-advance-icon' + (this.state.isOpened ? ' hide' : '')}>
                        <FaUnlink className='advance-icon' />
                    </div>
                    <div className={'item-advance-icon' + (this.state.isOpened ? ' hide' : '')}>
                        <FaPlay className='advance-icon' />
                    </div>
                    <div className={'item-advance-icon' + (this.state.isOpened ? ' hide' : '')}>
                        <FaInfo className='advance-icon' />
                    </div>

                </div>
                <div className={'item-default-icon' + (this.state.isOpened ? ' hide' : '')}>
                    <FaCheck className='check' />
                </div>
                <div className={'item-default-title' + (this.state.isOpened ? ' hide' : '')}>
                    <p>{this.props.animeTitle}</p>
                </div>
            </div>
        )
    }
}

export default Item
