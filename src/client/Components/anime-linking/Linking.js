import React from 'react'
import { connect } from 'react-redux'

import { FaCheckCircle } from 'react-icons/fa'

import './Linking.css'
import '../form/PopupForm.css'
import Loading from 'Client/Assets/loading.svg'
import AnimeCard from '../anime-card/Card'
import { toggleLinking, initiateLinking, resetLinking } from 'Client/JS/Actions/linking';
import { fetchDownloadedAnime } from 'Client/JS/Actions/index'

class AnimeLinking extends React.Component {
    constructor(props) {
        super(props);

        this.escFunction = this.escFunction.bind(this);
        this.handleLinking = this.handleLinking.bind(this);
        this.displayAlert = this.displayAlert.bind(this);
    }

    handleLinking(toBeInserted) {
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

    displayAlert() {
        if (this.props.linkMessage.status === 200) {
            return (
                <div className='alert-box'>
                    <FaCheckCircle className='alert-icon' />
                    <h2 className='alert-title'>Linking Successful</h2>
                    <p>The selected anime is linked with the downloaded anime</p>
                </div>
            )
        }
    }

    render() {
        const searchResults = this.props.searchRes.map(
            (res, index) =>
                <AnimeCard key={index} anime={res} initiateLinking={this.handleLinking} />
        )
        return (
            <div className='popup'>
                <div className='popup-inner'>
                    <div className='downloaded-anime'>
                        <h1>{this.props.searchTitle}</h1>
                    </div>
                    {this.props.linkMessage ? this.displayAlert() : (
                        <div className='content'>
                            {this.props.isLoading ? <Loading /> : searchResults}
                        </div>
                    )}
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
