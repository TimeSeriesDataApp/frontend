import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import Navbar from '../../component/navbar';
require('jest');

configure({ adapter: new Adapter() });

describe('<Navbar />', () => {
  describe('Shallow Mounting', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Navbar />));
    afterEach(() => wrapper.unmount());

    it('should render a Navbar component', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('should create an input checkbox for the hamburger toggle', () => {
      expect(wrapper.find('#cbox-sidebar-toggle').length).toEqual(1);
      expect(wrapper.find('#cbox-sidebar-toggle').type()).toEqual('input');
    });

    it('should create a simple Navbar <div> container', () => {
      expect(wrapper.find('.navbar').length).toEqual(1);
      expect(wrapper.find('.navbar').type()).toEqual('div');
    });

    it('should not contain any state', () => {
      expect(wrapper.state()).toBeNull();
    });
  });
});
