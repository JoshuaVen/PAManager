import React from 'react'
import { connect } from 'react-redux'

import { FaCheckCircle } from 'react-icons/fa'

import './Linking.css'
import '../form/PopupForm.css'
import Loading from 'Client/Assets/loading.svg'
import AnimeCard from '../anime-card/Card'
import { link_togg, link_init, link_reset, request } from 'Client/Containers/List/actions'

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
        const searchResults = this.props.searchRes ? this.props.searchRes.map(
            (res, index) =>
                <AnimeCard key={index} anime={res} initiateLinking={this.handleLinking} />
        ) : null
        return (
            <div className='popup'>
                <div className='popup-inner'>
                    <div className='downloaded-anime'>
                        {this.props.search ? <h1>{this.props.searchTitle}</h1> : null}
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
        link: state.link,
        searchRes: state.search ? state.search.searchRes : null,
        linkMessage: state.link ? state.link.message : null,
        isLoading: state.search ? state.search.loading : null,
        searchTitle: state.search ? state.search.searchTitle : null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDledAnime: () => dispatch(request()),
        initiateLinking: (linkingItem, referenceItem) => dispatch(link_init({ linkingItem, referenceItem })),
        toggleLinking: toggle => dispatch(link_togg(toggle)),
        resetLinking: () => dispatch(link_reset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimeLinking)
