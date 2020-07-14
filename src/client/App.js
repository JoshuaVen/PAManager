import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './app.css';
import Home from 'Client/Containers/Home'
import Signin from 'Client/Pages/Signin/Signin'
import Signout from 'Client/Pages/Signout/Signout'
import Header from 'Client/Containers/Header/Header'
import AuthPage from 'Client/Pages/Auth'
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
