import React from 'react';
import {shallow} from 'enzyme/build';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './../App';
Enzyme.configure({ adapter: new Adapter() })

it('mounts without crashing', () => {
  const wrapper = shallow(<App />);
  wrapper.unmount()
});
