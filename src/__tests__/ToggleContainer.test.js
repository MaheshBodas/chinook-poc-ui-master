import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {
  Alert
} from '@material-ui/core';
import { ToggleContainer }  from './../_components/ToggleContainer/ToggleContainer'

Enzyme.configure({ adapter: new Adapter() })

describe('ToggleContainer', () => {
  it('renders warningmsg without crashing', () => {
    const props =  {
      user: 'mahesh.bodas',
      loggedIn: true,
      loading: false,
      shouldDisplayMain: false,
      showFooter: false,
      hasError: false,
      showSuccess: false,
      type : '',
      message: '',
      isAdmin : true
    }

    const wrapper = Enzyme.mount(
      <ToggleContainer {...props}>
      {{
        warningmsg: (<h2> This is warning message</h2>),
        content: (<h3>Test content</h3>)
      }}
      </ToggleContainer>
      )

    expect(wrapper.find('LoaderComponent')).toHaveLength(0);
    expect(wrapper.find('h2')).toHaveLength(1);
    expect(wrapper.find('h3')).toHaveLength(0);
    wrapper.unmount();
  });

  it('renders content without crashing', () => {
    const props =  {
      loading: false,
      shouldDisplayMain: true,
      showFooter: false,
      hasError: false,
      showSuccess: false,
      type : '',
      message: '',
      isAdmin : true
    }

    // console.log({...props})
    const wrapper = Enzyme.mount(
    <ToggleContainer {...props}>
    {{
      warningmsg: (<h2> This is warning message</h2>),
      content: (<h3>Test content</h3>)
    }}
    </ToggleContainer>
    )

    expect(wrapper.find('LoaderComponent')).toHaveLength(0);
    expect(wrapper.find('h2')).toHaveLength(0);
    expect(wrapper.find('h3')).toHaveLength(1);
    wrapper.unmount();
  });

  it('renders footer without crashing', () => {
    const props =  {
      loading: false,
      shouldDisplayMain: true,
      showFooter: true,
      hasError: false,
      showSuccess: false,
      type : '',
      message: '',
      isAdmin : true
    }

    // console.log({...props})
    const wrapper = Enzyme.mount(
    <ToggleContainer {...props}>
    {{
      warningmsg: (<h2> This is warning message</h2>),
      content: (<h3>Test content</h3>),
      footer: (<p>This is footer</p>)
    }}
    </ToggleContainer>
    )

    expect(wrapper.find('LoaderComponent')).toHaveLength(0);
    expect(wrapper.find('h2')).toHaveLength(0);
    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.find('p')).toHaveLength(1);
    wrapper.unmount();
  });

  //
  it('renders header without crashing', () => {
    const props =  {
      loading: false,
      shouldDisplayMain: true,
      showFooter: true,
      hasError: false,
      showSuccess: false,
      type : '',
      message: '',
      isAdmin : true
    }

    // console.log({...props})
    const wrapper = Enzyme.mount(
    <ToggleContainer {...props}>
    {{
      header: (<h1>This is header</h1>),
      warningmsg: (<h2> This is warning message</h2>),
      content: (<h3>Test content</h3>),
      footer: (<p>This is footer</p>)
    }}
    </ToggleContainer>
    )

    expect(wrapper.find('LoaderComponent')).toHaveLength(0);
    expect(wrapper.find('h2')).toHaveLength(0);
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.find('p')).toHaveLength(1);
    wrapper.unmount();
  });

  //

  it('renders LoaderComponent without crashing', () => {
    const props =  {
      loading: true,
      shouldDisplayMain: false,
      showFooter: false,
      hasError: false,
      showSuccess: false,
      type : '',
      message: '',
      isAdmin : true
    }

    // console.log({...props})
    const wrapper = Enzyme.mount(
    <ToggleContainer {...props}>
    {{
      header: (<h1>This is header</h1>),
      warningmsg: (<h2> This is warning message</h2>),
      content: (<h3>Test content</h3>)
    }}
    </ToggleContainer>
    )

    // const component = wrapper.dive()
    // expect span as warningmsg
    // expect(wrapper.find('div').hasClass('card-header')).toBe(true)
    expect(wrapper.find('LoaderComponent')).toHaveLength(1);
    expect(wrapper.find('h1')).toHaveLength(0);
    expect(wrapper.find('h2')).toHaveLength(0);
    expect(wrapper.find('h3')).toHaveLength(0);
    wrapper.unmount();
  });


  it('renders Alert without crashing', () => {
    const props =  {
      loading: true,
      shouldDisplayMain: false,
      showFooter: false,
      hasError: true,
      showSuccess: false,
      type : 'alert-danger',
      message: 'Error retrieving data',
      isAdmin : true
    }
    const errorInfo = {type: props.type, message: props.message}
    // console.log({...props})
    const wrapper = Enzyme.mount(
      <ToggleContainer {...props}>
      {{
        warningmsg: (<h2> This is warning message</h2>),
        content: (<h3>Test content</h3>),
        errorInfo: errorInfo,
      }}
      </ToggleContainer>
    )    
    expect(wrapper.find('LoaderComponent')).toHaveLength(0);
    expect(wrapper.find('h2')).toHaveLength(0);
    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.find(Alert)).toHaveLength(1);
    wrapper.unmount();
  });

})
