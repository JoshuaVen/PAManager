import React from 'react'
import Feature from '../Feature'

import { mount, shallow } from 'enzyme';

let main;

describe('Feature Component', () => {
    it('contains the feature div', () => {
        main = shallow(<Feature />)

        expect(main.find('.feature').length).to.equal(1)
    })
})
