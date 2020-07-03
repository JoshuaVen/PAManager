import React from 'react';
import { connect } from 'react-redux'
import { connectToMal, disconnectFromMal } from 'Client/JS/Actions/index'
import './Header.css';

class Header extends React.Component {
    changeConnectionToMal() {
        if (this.props.isConnectedToMal) {
            return this.props.disconnectFromMal()
        } else {
            return this.props.connectToMal()
        }
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
                        <p onClick={() => this.changeConnectionToMal()}>{this.props.isConnectedToMal ? 'Connected' : 'Disconnected'}</p>
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
