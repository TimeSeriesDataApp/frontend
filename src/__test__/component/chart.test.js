import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import Chart from '../../component/chart';
import { Line } from 'react-chartjs-2';
require('jest');

configure({ adapter: new Adapter() });

describe('<Chart />', () => {
  describe('Shallow Mounting', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Chart />));
    afterEach(() => wrapper.unmount());

    it('should render a Chart component inside a <div>', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('.line-chart').length).toEqual(1);
    });

    it('should set the Chart container as a <div>', () => {
      expect(wrapper.find('.line-chart').type()).toEqual('div');
    });

    it('should not have any state object', () => {
      expect(wrapper.state()).toBeNull();
    });

    it('should contain a Line chart from the react-chartjs-2 library', () => {
      expect(wrapper.find(Line).length).toEqual(1);
    });
  });
});
