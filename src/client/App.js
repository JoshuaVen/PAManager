import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import loadable from 'Client/Utils/loadable'
import Loading from 'Client/Components/loading-component/Loading'

import './app.css';
// import Home from 'Client/Containers/Home'
const Home = loadable(
    () => import(/* webpackPrefetch: true, webpackChunkName: 'Home' */'Client/Containers/HomePage'),
    { fallback: <Loading /> })
const Signin = loadable(
    () => import(/* webpackPrefetch: true, webpackChunkName: 'Signin' */'Client/Services/Signin'),
    { fallback: <Loading /> })
const MalConnectPage = loadable(
    () => import(/* webpackPreload: true, webpackChunkName: 'MalConnect' */'Client/Services/MalConnector'),
    { fallback: <Loading /> })
const Signout = loadable(
    () => import(/* webpackPrefetch: true, webpackChunkName: 'Signout' */'Client/Services/Signout'),
    { fallback: <Loading /> })
const AnimePage = loadable(
    () => import(/* webpackPrefetch: true, webpackChunkName: 'Anime' */'Client/Containers/AnimePage'),
    { fallback: <Loading /> })
import Header from 'Client/Containers/Header/Header'
import Root from 'Client/JS/Root'

class App extends Component {
    render() {
        return (
            <Root>
                <BrowserRouter>
                    <Header />
                    <Route path='/' exact component={Home} />
                    <Route path='/anime' exact component={AnimePage} />
                    <Route path='/auth' exact component={MalConnectPage} />
                    <Route path='/signin' exact component={Signin} />
                    <Route path='/signout' exact component={Signout} />
                </BrowserRouter>
            </Root>
        );
    }
}

export default App;
