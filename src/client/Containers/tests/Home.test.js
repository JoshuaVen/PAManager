import React from 'react';
import ReactDom from 'react-dom';
import { shallow } from 'enzyme';

import Home from 'Client/Containers/Home';
import Root from 'Client/JS/Root'
import { expect } from 'chai';

let wrapped

describe('Home Container', () => {
    it('renders the home container', () => {
        wrapped = shallow(
            <Root>
                <Home />
            </Root>
        );
    });


});
