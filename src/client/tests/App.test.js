import React from "react";
import ReactDOM from "react-dom";
import App from '../App';
import Header from 'Client/Components/header/Header';
import { mount, shallow } from 'enzyme';

let wrapped;

describe('App Component', () => {
    beforeEach(() => {
        wrapped = shallow(<App />);
    });

    afterEach(() => {
        wrapped.unmount();
    });

    // it('calls componentDidMount', () => {
    //     sinon.spy(App.prototype, 'componentDidMount');

    //     const wrapper = mount(<App />);
    //     expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
    // });
    // it('renders the App', () => {
    //     wrapped = shallow(<App />)
    // });
});
