import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Dashboard }  from './../views/Dashboard/Dashboard';
// import Dashboard from './../views/Dashboard/ExportDashBoard'

Enzyme.configure({ adapter: new Adapter() })

test('getUserDetails() is called when componentDidMount os invoked', () => {
  const props =  {
    user: 'mahesh.bodas',
    loggedIn: true,
    type : '',
    message: '',
    loading: false,
    isAdmin : true,
    hasError: false,
    getUserDetails: jest.fn()
  }
  const componentDidMountSpy = jest.spyOn(Dashboard.prototype, 'componentDidMount');

  const wrapper = Enzyme.shallow(<Dashboard {...props}/>);
  expect(Dashboard.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  expect(props.getUserDetails).toHaveBeenCalledTimes(1);
  componentDidMountSpy.mockClear();
});
