import React from 'react'
import { connect } from 'react-redux'

import './Linking.css'
import '../form/PopupForm.css'
import Loading from 'Client/Assets/loading.svg'
import { toggleLinking, initiateLinking } from 'Client/JS/Actions/linking';

class AnimeLinking extends React.Component {
    constructor(props) {
        super(props);

        this.escFunction = this.escFunction.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(toBeInserted) {
        toBeInserted.searchTitle = this.props.searchTitle
        this.props.initiateLinking(toBeInserted)
    }

    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.toggleLinking()
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction);
    }

    componentWillUnmount() {
        alert('List updated! Refreshing page...')
        location.reload()
        document.removeEventListener("keydown", this.escFunction);
    }

    render() {
        const searchResults = this.props.searchRes.map(
            (res, index) =>
                <div className="animeCard" key={index} onClick={() => this.handleClick(res)}>
                    <img className="animeImage" src={res.image_url} alt="Anime Poster" />
                    <p className="animeTitle">{res.title}</p>
                </div>
        )
        return (
            <div className='popup'>
                <div className='popup-inner'>
                    <div className='downloaded-anime'>
                        <p>{this.props.searchTitle}</p>
                    </div>
                    <div className='content'>
                        {this.props.isLoading ? <Loading /> : searchResults}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        linkSuccess: state.link.linkingSuccess,
        linkMessage: state.link.message,
        searchRes: state.searchList.searchRes,
        isLoading: state.searchList.loading,
        searchTitle: state.searchList.searchTitle
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initiateLinking: linkingItem => dispatch(initiateLinking(linkingItem)),
        toggleLinking: toggle => dispatch(toggleLinking(toggle))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimeLinking)
