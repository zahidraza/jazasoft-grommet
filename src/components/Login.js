import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import { userLogin, userProfile } from '../actions/authActions';


import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Spinning from 'grommet/components/icons/Spinning';
import TSnackbar from './TSnackbar';

class Login extends Component {

  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      errorMsg: ''
    };
    this._onChange = this._onChange.bind(this);
    this._onLogin = this._onLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {authProgress, loginSuccess, profileSuccess , authenticated, message} = nextProps.auth;
    if (authenticated) {
      console.log('auth successful');
      this.props.history.push('/');
    }
    if (authProgress && loginSuccess && !profileSuccess) {
      console.log('get profile');
      this.props.dispatch(userProfile(this.props.restClient, sessionStorage.username));
    }
    if (this.props.auth.authProgress && !authProgress && !authenticated) {
      console.log('auth failure');
      this.setState({errorMsg: message});
    }
  }
  
  _onChange(event) {
    const attr = event.target.getAttribute('name');
    if (attr === 'email') {
      this.setState({email: event.target.value})
    }
    if (attr === 'password') {
      this.setState({password: event.target.value})
    }
  }

  _onLogin () {
    const {email, password} = this.state;
    this.props.dispatch(userLogin(this.props.authClient, this.state.email, this.state.password));
  }

  render() {
    const { email, password, errorMsg } = this.state;
    const { authProgress } = this.props.auth;
    return (
      <App>
        <Box pad={{horizontal: 'large', vertical: 'large'}} wrap={true}  full='vertical'  >
          <Box align='end' justify='end' pad={{'horizontal': 'large', vertical:'large', between:'large'}}>
            <Box size='auto'  align='center' separator='all' justify='center' colorIndex='light-1' pad={{'horizontal': 'medium', vertical:'medium', between:'medium'}} >
              <Heading tag='h2'>{this.props.appName}</Heading>
              {authProgress ? <Spinning /> : null}
              <Form>
                <FormFields>
                  <FormField label='User Name'>
                    <input type='text' name='email' value={email} onChange={this._onChange} />
                  </FormField>
                  <FormField label='Password'>
                    <input type='password' name='password' value={password} onChange={this._onChange} />
                  </FormField>
                </FormFields>
                <p style={{color:'red'}} >{errorMsg}</p>
                <Footer pad={{'vertical': 'small'}}>
                  <Button label='Login' fill={true} primary={true}  onClick={this._onLogin} />
                </Footer>
              </Form>
            </Box>
          </Box>
          <TSnackbar />
        </Box>
      </App>
    );
  }
}

Login.propTypes = {
  appName: PropTypes.string.isRequired,
  authClient: PropTypes.func.isRequired,
  restClient: PropTypes.func
};

let select = (store) => {
  return {routing: store.routing, auth: store.auth};
};

export default withRouter(connect(select)(Login));
