import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './app.css';
import Home from 'Client/Containers/Home'
import AuthPage from 'Client/Pages/Auth'
import Root from 'Client/JS/Root'
import Circle from 'Client/Assets/new-circle.svg'

class App extends Component {
    render() {
        return (
            <Root>
                <BrowserRouter>
                    <Route path='/' exact component={Home} />
                    <Route path='/auth' exact component={AuthPage} />
                </BrowserRouter>
            </Root>
        );
    }
}

export default App;
