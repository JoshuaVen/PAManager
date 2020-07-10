import React from 'react';
import pkce from 'pkce-challenge'
import { connect } from 'react-redux'
import { connectToMal, disconnectFromMal } from 'Client/JS/Actions/index'
import './Header.css';
import Axios from 'axios';

class Header extends React.Component {

    changeConnectionToMal() {
        const baseURL = 'https://myanimelist.net/v1/oauth2/authorize'
        const responseType = '?response_type=code&'
        const clientId = 'client_id=6e30f7d9a69d59b978e94825b9bc00db&'
        const { code_verifier, code_challenge } = pkce(128)
        const challenge = 'code_challenge=' + code_challenge + '&'
        const state = 'state=REQUESTID1&'
        const redirectURI = 'redirect_uri=http://localhost:3000/auth'
        const URL = baseURL + responseType + clientId + challenge + state + redirectURI
        localStorage.setItem('code_challenge', code_challenge)
        localStorage.setItem('code_verifier', code_verifier)
        // window.open(URL, "_blank")

        // if (this.props.isConnectedToMal) {
        //     return this.props.disconnectFromMal()
        // } else {
        //     return this.props.connectToMal()
        // }
    }

    render() {
        return (
            <header>
                <div className='top-section'>
                    <div className='left-top'>
                        <h1 className='page-title'>{this.props.pages[this.props.currentActive].title}</h1>
                        <p className='page-description'>{this.props.pages[this.props.currentActive].description}</p>
                    </div>
                    <div className='right-top'>
                        <p onClick={() => this.changeConnectionToMal()}>Connect to MAL</p>
                    </div>
                </div>
                <div className='bottom-section'>
                    {this.props.pages.map(
                        (page, index) => (
                            <div
                                key={index}
                                className={index === this.props.currentActive ? 'page-selector active' : 'page-selector'}
                                onClick={() => console.log('clicked')}
                            >
                                <p>{page.title}</p>
                            </div>
                        )
                    )}
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        pages: state.header.pages,
        currentActive: state.header.currentActive,
        isConnectedToMal: state.header.isConnectedToMAL
    }
}

const mapDispatchToProps = dispatch => {
    return {
        connectToMal: connect => dispatch(connectToMal(connect)),
        disconnectFromMal: disconnect => dispatch(disconnectFromMal(disconnect))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
