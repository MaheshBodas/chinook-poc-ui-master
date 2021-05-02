import React, { Component } from 'react';
import { Button, Form, Input } from 'element-react';
import { Alert } from 'reactstrap';

import { ReactComponent as UserSvg } from './../../icons/svg/user.svg';
import { ReactComponent as PasswordSvg } from './../../icons/svg/password.svg';
import { ReactComponent as EyeSvg } from './../../icons/svg/eye.svg';

import { connect } from 'react-redux';

import { authenticationActions } from '../../_actions';

const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter the correct username'))
  } else {
    callback()
  }
}
const validatePass = (rule, value, callback) => {
  if (value.length < 5) {
    callback(new Error('Password cannot be less than 5'))
  } else {
    callback()
  }
}

class Login extends Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(userActions.logout());
        this.props.logout();

        this.state = {
            loginForm: {
              username: '',
              password: ''
            },
            submitted: false,
            pwdType: 'password',
            loading: false,
            loginRules: {
              username: [{ required: true, trigger: 'blur', validator: validateUsername }],
              password: [{ required: true, trigger: 'blur', validator: validatePass }]
            },
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.showPwd = this.showPwd.bind(this)
    }

    componentDidUpdate(prevProps) {
      // if((this.props.risktype !== prevProps.risktype) && (this.props.risktype !== undefined) ) {
        if(this.props.type !== prevProps.type && prevProps.type === undefined) {
          this.setState({
              loading: false
            });
          console.log('componentDidUpdate => this.state.loading');
          console.log(this.state.loading);
        }
    }

    showPwd() {
      if (this.state.pwdType === 'password') {
        this.pwdType = ''
        this.setState({
          pwdType: ''
        });
      } else {
        this.setState({
          pwdType: 'password'
        });
      }
    }

    handleChange(key, value) {
        console.log(key)
        console.log(value)
        this.setState({
          loginForm: Object.assign({}, this.state.loginForm, { [key]: value })
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true, loading: true });
        const { username, password } = this.state.loginForm;
        // const { dispatch } = this.props;
        if (username && password) {
            // dispatch(userActions.login(username, password));
            // alert('Here about to invoke this.props.login')
            this.props.login(username, password)
        }
    }

    render() {

      const {type: alert_type , message} = this.props;
      const {loginForm, loginRules} = this.state
      const {username, password} = loginForm
      let parsedErrorMessage = ''
      console.log('alertType ' + alert_type)
      console.log('message ' + message)
      if(alert_type === 'alert-danger') {
        if(message != null) {
          console.log(message)
          try {
            const errorObj = JSON.parse(message)
            if(errorObj)  {
              parsedErrorMessage = errorObj['non_field_errors'][0]
            }
          }
          catch(err){
            if(err instanceof TypeError){
              const strError = err.message
              var n = strError.search("Cannot read property 'data' of undefined");
              if(n > -1){
                parsedErrorMessage = "Unable to reach to GraphQL based server please try after 5 minutes"
              }
            }
            else {
              parsedErrorMessage = message
            }            
          }
        }
        else {
          parsedErrorMessage = "Some unexpected error"
        }
      }
      return (
        <div className="login-container">
          <Form id="loginForm" ref="loginForm" autoComplete="on" className="card-box login-form" model={loginForm} labelPosition="left" labelWidth="0px" size="mini"  rules={loginRules}>
            <h3 className="title">Chinook DB PoC User</h3>
            <Form.Item prop="username">
            <span className="svg-container svg-container_login">
              {/* <SvgIcon iconClass="user" /> */}
              <UserSvg className="svg-icon"/>
            </span>
              <Input name="username" type="text" autoComplete="on" placeholder="username" value={username} onChange={this.handleChange.bind(this, 'username')} />
            </Form.Item>
            <Form.Item prop="password">
              <span className="svg-container">
                <PasswordSvg className="svg-icon"/>
              </span>
              <Input name="password" type={this.state.pwdType} autoComplete="on"
                placeholder="password" value={password} onChange={this.handleChange.bind(this, 'password')}></Input>
                <span className="show-pwd" onClick={this.showPwd}>
                  <EyeSvg className="svg-icon"/>
                </span>
            </Form.Item>
            <Form.Item>
              <Button type="primary" style={{width:'100%'}} loading={this.state.loading} onClick={this.handleSubmit}>
                Sign in
              </Button>
            </Form.Item>
            <Form.Item>
            { alert_type === 'alert-danger' && <Alert color="danger">
                            { parsedErrorMessage }
              </Alert> }
            </Form.Item>
              <table style={{width:'100%'}}>
                <tbody>
                <tr>
                  <td></td>
                  <td className="tips">username: adminuser</td>
                  <td></td>
                  <td className="tips">password: poctest#1</td>
                </tr>
                </tbody>
              </table>
          </Form>
        </div>
      );
    }
}

function mapStateToProps(state) {
    // const { loggingIn } = state.authentication;
    // return {
    //     loggingIn
    // };
    //TBD
    const { alert, authentication } = state;
    // const dummyAuth = {user:'', loggedIn:false, isAdmin:false, loading:false}
    const { loggedIn } = authentication
    const {type, message} = alert;
    return {
      loggedIn,
      type,
      message
    }
    //TBD
}

function mapDispatchToProps(dispatch) {
    return {
        // dispatching plain actions
        login: (username, password) => dispatch( authenticationActions.login(username, password) ),
        logout: () => dispatch( authenticationActions.logout ),
    }
}

const connectedLoginPage = connect(mapStateToProps , mapDispatchToProps)(Login);
export { connectedLoginPage as Login };
