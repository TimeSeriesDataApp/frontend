import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import Dashboard from '../../component/dashboard';
import Sidebar from '../../component/sidebar';
require('jest');

configure({ adapter: new Adapter() });

describe('<Dashboard />', () => {
  describe('Shallow Mounting', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Dashboard />));
    afterEach(() => wrapper.unmount());

    it('should render a Dashboard component', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('.dashboard').length).toEqual(1);
    });

    it('should set the Dashboard container as a <div>', () => {
      expect(wrapper.find('.dashboard').type()).toEqual('div');
    });

    it('should have a default state containing a rawData property as an empty array', () => {
      expect(wrapper.state().rawData).toEqual([]);
    });

    it('should render a <Sidebar /> component', () => {
      expect(wrapper.find(Sidebar).length).toEqual(1);
    });

    it('should not have rendered any Line charts yet', () => {
      expect(wrapper.find(Chart).length).toEqual(0);
    });

    it('should have a <div> asking user to choose devices when no charts are present', () => {
      expect(wrapper.find('.no-diagnostics').length).toEqual(1);
      expect(wrapper.find('.no-diagnostics').type()).toEqual('div');
    });

  });
});
