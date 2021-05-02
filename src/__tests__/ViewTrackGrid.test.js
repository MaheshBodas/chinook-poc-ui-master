// https://github.com/MaheshBodas/reactjs-poc-ui-master_pvt/blob/master/src/_components/ViewRiskCtrl/ViewRiskCtrl.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'; // Smart components
import Enzyme, { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import  {ViewTrackGrid}  from './../_components/ViewTrackGrid/ViewTrackGrid'
import {ComposableContainer} from './../_components/ComposableContainer/ComposableContainer'

configure({ adapter: new Adapter() });

function mapStateToProps(state) {
    const { alert, authentication, viewalltracks } = state;
    const { loggingIn } = authentication;
    const {type, message} = alert;
    const {tracksInstancesTable, tracksInstanceTableColumns, count, loading } = viewalltracks

    let shouldDisplayMain = false
    let showFooter = false
    let hasError = false

    if(tracksInstancesTable && tracksInstancesTable.length > 0) {
      shouldDisplayMain = true
      showFooter = true
    }

    if(type === 'alert-danger') {
      hasError = true;
    }

    console.log('mapStateToProps View Tracks' + tracksInstancesTable + shouldDisplayMain)
    return {
      loggingIn,
      type,
      message,
      shouldDisplayMain,
      showFooter,
      tracksInstancesTable,
      tracksInstanceTableColumns,
      count,
      loading,
      hasError,
      getTracks: jest.fn(),
      resetAllTracks: jest.fn()
    }
}

function setup() {
  // const get_single_risk_success_response_to_expect = require('./../_data/get_single_risk_success_response.json')
  // const props = mapStateToProps(get_single_risk_success_response_to_expect)
  const props =  {
    user: 'mahesh.bodas',
    loggedIn: true,
    type : '',
    message: '',
    loading: false,
    isAdmin : true,
    hasError: false,
    shouldDisplayMain: true,
    showFooter: true,
    getTracks: jest.fn(),
    resetAllTracks: jest.fn()
  }

  const initialState = {}
  const mockStore = configureStore();
  let store = mockStore(initialState)

  const wrapper = Enzyme.shallow(<Provider store={store}><ViewTrackGrid {...props}/></Provider>);
  return {
    props,
    wrapper,
    store
  }
}
// const componentDidMountSpy = jest.spyOn(ViewRiskCtrl.prototype, 'componentDidMount');
describe('components', () => {
  describe('Header', () => {
    it('should render self and subcomponents', () => {
      const { props, wrapper } = setup();
      wrapper.unmount();
    })

    it('renders without crashing', () => {
      const div = document.createElement('div');
      const { props, wrapper, store } = setup();
      ReactDOM.render(<Provider store={store}><MemoryRouter><Route path="/app/tracks" name="tracks" component={ViewTrackGrid} /></MemoryRouter></Provider>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  })
})
