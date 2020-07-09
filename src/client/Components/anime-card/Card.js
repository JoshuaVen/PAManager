import React from 'react'

import { FaCheck, FaTimes } from 'react-icons/fa'
import './Card.css'

class Card extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentlyConfirming: false
        }
        this.toggleConfirmation = this.toggleConfirmation.bind(this)
    }

    toggleConfirmation() {
        this.setState({
            currentlyConfirming: !this.state.currentlyConfirming
        })
    }

    render() {
        return (
            <div
                className='anime-card'
                onClick={() => {
                    this.toggleConfirmation()
                }}
            >
                {this.state.currentlyConfirming ? (
                    <div className='confirmation'>
                        <div className='confirm-div' onClick={() => this.props.initiateLinking(this.props.anime)}>
                            <FaCheck className='icon confirm' />
                        </div>
                        <div className='cancel-div' onClick={() => this.toggleConfirmation()}>
                            <FaTimes className='icon cancel' />
                        </div>
                    </div>
                ) : (
                        <div>
                            <img className="animeImage" src={this.props.anime.image_url} alt="Anime Poster" />
                            <p className="animeTitle">{this.props.anime.title}</p>
                        </div>
                    )}
            </div>
        )
    }
}

export default Card
