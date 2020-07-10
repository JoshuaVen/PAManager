import React from 'react'
import './Item.css'
import './item-advance.css'
import './item-default.css'
import { FaCheck, FaUnlink, FaPlay, FaInfo, FaAngleRight } from 'react-icons/fa'

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
        const genres = this.props.anime.genre.map((g, index) =>
            <span className='genre-span' key={index}>{g.name}</span>
        )

        return (
            <div className={'item' + (this.state.isOpened ? ' advance' : '')}>
                <div className={'item-title' + (this.state.isOpened ? ' hide' : '')}>
                    <span className='span-title'>{this.props.anime.title}</span>
                </div>
                <img className='item-image' src={'http://localhost:8080/' + this.props.anime.offline_img} alt='Anime Poster' />
                <div className={'item-genre'}>
                    {genres}
                </div>
                <div className='item-default'>
                    <div
                        className='item-default-icon'
                    >
                        <FaCheck className={'check'} />
                        <FaAngleRight className={'extend'} onClick={this.handleClick} />
                    </div>
                    <div className={'item-advance' + (this.state.isOpened ? '' : ' hide')}>
                        <div className={'item-advance-icon' + (this.state.isOpened ? '' : ' hide')}>
                            <FaUnlink className='advance-icon' />
                        </div>
                        <div className={'item-advance-icon' + (this.state.isOpened ? '' : ' hide')}>
                            <FaPlay className='advance-icon' />
                        </div>
                        <div className={'item-advance-icon' + (this.state.isOpened ? '' : ' hide')}>
                            <FaInfo className='advance-icon' />
                        </div>

                    </div>
                    <div className={'item-default-premier' + (this.state.isOpened ? ' hide' : '')}>
                        <span className='year-span'>Year Premiered: {this.props.anime.premier_year}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item
