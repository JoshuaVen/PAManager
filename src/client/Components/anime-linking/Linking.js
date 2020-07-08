import React from 'react'
import { connect } from 'react-redux'

import './Linking.css'
import '../form/PopupForm.css'
import Loading from 'Client/Assets/loading.svg'
import { toggleLinking, initiateLinking, resetLinking } from 'Client/JS/Actions/linking';
import { fetchDownloadedAnime } from 'Client/JS/Actions/index'

class AnimeLinking extends React.Component {
    constructor(props) {
        super(props);

        this.escFunction = this.escFunction.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(toBeInserted) {
        this.props.initiateLinking(toBeInserted, this.props.searchTitle)
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
        this.props.resetLinking()
        this.props.fetchDledAnime()
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
                        {this.props.linkMessage ? this.props.linkMessage.statusText : this.props.isLoading ? <Loading /> : searchResults}
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
        fetchDledAnime: () => dispatch(fetchDownloadedAnime()),
        initiateLinking: (linkingItem, referenceItem) => dispatch(initiateLinking(linkingItem, referenceItem)),
        toggleLinking: toggle => dispatch(toggleLinking(toggle)),
        resetLinking: () => dispatch(resetLinking())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimeLinking)
