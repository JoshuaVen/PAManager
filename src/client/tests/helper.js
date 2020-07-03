import { expect } from 'chai';
import sinon from 'sinon';
import { mount, render, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.sinon = sinon;

global.expect = expect;

global.mount = mount;
global.render = render;
global.shallow = shallow;
