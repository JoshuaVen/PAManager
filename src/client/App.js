import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import loadable from 'Client/Utils/loadable'
import Loading from 'Client/Components/loading-component/Loading'

import './app.css';
import Home from 'Client/Containers/Home'
const Signin = loadable(
    () => import(/* wepackPreload: true */'Client/Pages/Signin/Signin'),
    { fallback: <Loading /> })
const AuthPage = loadable(
    () => import(/* webpackPrefetch: true*/'Client/Pages/Auth'),
    { fallback: <Loading /> })
const Signout = loadable(
    () => import(/* webpackPrefetch: true*/'Client/Pages/Signout/Signout'),
    { fallback: <Loading /> })
import Header from 'Client/Containers/Header/Header'
import Root from 'Client/JS/Root'

class App extends Component {
    render() {
        return (
            <Root>
                <BrowserRouter>
                    <Header />
                    {/* <Route path='/' exact component={Home} /> */}
                    <Route path='/auth' exact component={AuthPage} />
                    <Route path='/signin' exact component={Signin} />
                    <Route path='/signout' exact component={Signout} />
                </BrowserRouter>
            </Root>
        );
    }
}

export default App;
