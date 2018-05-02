import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import Sidebar from '../../component/sidebar';
require('jest');

configure({ adapter: new Adapter() });

describe('<Sidebar />', () => {
  describe('Shallow Mounting', () => {
    let wrapper;
    let wrapper2;
    let devices;
    let timeOptions;
    beforeEach(() => {
      // set localStorage empty for the first wrapper
      global.localStorage = {};
      devices = [
        { name: 'device1', label: 'Device 1' },
        { name: 'device2', label: 'Device 2' },
        { name: 'device3', label: 'Device 3' },
        { name: 'device4', label: 'Device 4' },
        { name: 'device5', label: 'Device 5' },
        { name: 'device6', label: 'Device 6' },
      ];
      timeOptions = {
        name: 'selectorName',
        choices: [
          { label: 'Select 1', value: 'sel1', checked: true},
          { label: 'Select 2', value: 'sel2' },
        ],
      };
      wrapper = shallow(
        <Sidebar
          selectSliders={devices}
          segmentControl={timeOptions}
        />
      );

      // re-configure localStorage with some values to be restored
      global.localStorage = {
        'options': JSON.stringify({
          'device1': true,
          'device2': false,
          'device3': true,
          'selectorName': 'sel2',
        }),
      };

      wrapper2 = shallow(
        <Sidebar
          selectSliders={devices}
          segmentControl={timeOptions}
          onComplete={() => null}
        />
      );
    });
    afterEach(() => {
      wrapper.unmount();
      wrapper2.unmount();
    });

    it('should render a Sidebar component', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('should set the Sidebar container as a <div>', () => {
      expect(wrapper.find('.sidebar').type()).toEqual('div');
    });

    it('should have a state reflecting devices passed in', () => {
      expect(wrapper.state().device1).toEqual(false);
      expect(wrapper.state().device2).toEqual(false);
      expect(wrapper.state().device3).toEqual(false);
      expect(wrapper.state().device4).toEqual(false);
      expect(wrapper.state().device5).toEqual(false);
      expect(wrapper.state().device6).toEqual(false);
    });

    it('should have set the correct selected segment control from provided data', () => {
      expect(wrapper.state().selectorName).toEqual('sel1');
    });

    it('should initialize all values for state from localStorage when available', () => {
      expect(wrapper2.state().device1).toEqual(true);
      expect(wrapper2.state().device2).toEqual(false);
      expect(wrapper2.state().device3).toEqual(true);
      expect(wrapper2.state().selectorName).toEqual('sel2');
    });

    it('should not modify values in state not found in localStorage', () => {
      expect(wrapper2.state().device4).toEqual(false);
      expect(wrapper2.state().device5).toEqual(false);
      expect(wrapper2.state().device6).toEqual(false);
    });

    it('should render selection sliders for all 6 devices provided in props', () => {
      expect(wrapper.find('.select-slider').length).toEqual(6);
    });

    it('should render two segment controls that were provided in props', () => {
      expect(wrapper.find('.segment-control').length).toEqual(2);
    });
  });
});
