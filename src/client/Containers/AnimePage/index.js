import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import url from 'url'

import injectReducer from 'Client/Utils/injectReducer'
import injectSaga from 'Client/Utils/injectSaga'
import requireAuth from 'Client/Services/requireAuth'

import animeReducer from './reducer'
import animeSaga from './saga'
import * as anime from './actions'
import './AnimePage.css'


class Anime extends React.Component {
    componentDidMount() {
        const mal_id = url.parse(window.location.href, true).query.mal_id
        this.props.details(mal_id)
    }

    render() {
        if (!this.props.data) {
            return null
        }
        return (
            <div>
                <div className='title'>
                    <div className='title-jp'>
                        <span className='title-span jp'>
                            {this.props.data.title_japanese}
                        </span>
                    </div>
                    <div className='title-en'>
                        <span className='title-span en'>
                            {this.props.data.title}
                        </span>
                    </div>
                    <div className='box-genres'>
                        {this.props.data.genres.map((genre, index) =>
                            <span key={index} className='genre-span'>{genre.name}</span>
                        )}
                    </div>
                    <div className='details'>
                        <div className='summary'>
                            <img src={'http://localhost:8080/' + this.props.data.offline_img} alt='Anime Poster' />
                            <div className='year'>
                                <p>{this.props.data.aired.string}</p>
                            </div>
                            <div className='studio'>
                                {this.props.data.studios.map((studio, index) =>
                                    <span className='box-studio' key={index}>{studio.name}</span>
                                )}
                            </div>
                        </div>
                        <div className='synopsis'>
                            <p>{this.props.data.synopsis}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    if (!state.anime) { return {} }
    return {
        data: state.anime.data,
        isRequesting: state.anime.requesting,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        details: (mal_id) => dispatch(anime.req(mal_id))
    }
}

export default compose(
    injectReducer({ key: 'anime', reducer: animeReducer }),
    injectSaga({ key: 'animeSaga', saga: animeSaga }),
    connect(mapStateToProps, mapDispatchToProps),
    requireAuth,
)(Anime)
