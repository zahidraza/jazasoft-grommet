import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import { userLogin, userProfile } from '../actions/authActions';
import { SHOW_SNACKBAR } from '../actions/notificationActions';
import { CUSTOM } from '../rest/types';


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
import GNotification from './GNotification';
import Dailog from './Dailog';
import GForm from './GForm';

const draw = () => {
  const htmlCanvas = document.getElementById('c');
  if (htmlCanvas == undefined) return;
  const  context = htmlCanvas.getContext('2d');
  
 // Start listening to resize events and draw canvas.
  initialize();

  function initialize() {
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
  }

  function redraw() {
    context.globalAlpha = 0.9;
    var lingrad = context.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
    lingrad.addColorStop(0, '#FF7F50');
    //lingrad.addColorStop(0.5, '#26C000');
    lingrad.addColorStop(1, '#135058');
    context.fillStyle = lingrad;
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);

    const rect = document.getElementById('loginBox').getBoundingClientRect();
    const x = rect.left, y = rect.top;
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;

    context.clearRect(x, y,width,height);
  }

  function resizeCanvas() {
    if (!location.href.includes('login')) return;
    htmlCanvas.width = window.innerWidth;
    htmlCanvas.height = window.innerHeight;
    redraw();
  }
};

class Login extends Component {

  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      errorMsg: '',
      dialogActive: false,
      busy: false
    };
    this._onChange = this._onChange.bind(this);
    this._onLogin = this._onLogin.bind(this);
    this._toggleDialog = this._toggleDialog.bind(this);
    this._resetPassword = this._resetPassword.bind(this);
  }

  
  componentDidMount() {
    draw();
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

  _resetPassword(params) {
    if (this.state.busy) return;
    const {formData} = this.props.form;
    if (formData.username.trim().length == 0) {
      alert('Enter username/email');
      return;
    }
    const url = 'users/forgotPassword';
    const options = {
      url,
      method: 'PATCH',
      params: {username: formData.username}
    };
    this.setState({busy: true});
    this.props.restClient(CUSTOM, url, options)
    .then(response => {
      console.log(response);
      if (response.status == 200 && response.data && response.data.message) {
        this.props.dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: response.data.message}}});
        this.setState({busy: false, dialogActive: false});
      }
    })
    .catch(error => {
      console.log(error.response);
      if (error.response.status == 404) {
        this.props.dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'User Not Found.'}}});
      }
      this.setState({busy: false, dialogActive: false});
    });
  }

  _toggleDialog() {
    this.setState({dialogActive: !this.state.dialogActive});
  }

  _onLogin () {
    const {email, password} = this.state;
    this.props.dispatch(userLogin(this.props.authClient, this.state.email, this.state.password));
  }

  render() {
    const { email, password, errorMsg } = this.state;
    const { authProgress } = this.props.auth;

    const data = [
      {
        elements: [
          {
            elementType: 'input',
            name: 'username',
            label: 'Username/Email'
          }
        ]
      }
    ];
    const forgotPasswordConetent = (
      <GForm title='Password Reset'
        busy={this.state.busy}
        data={data} />
    );

    return (
      <App >
        <canvas id='c' style={{position: 'absolute', left: 0, top: 0}} >
        </canvas>
        <Box  full='horizontal' margin={{vertical: 'large'}} >
          <Box align='end' margin={{vertical: 'large'}} pad={{vertical: 'large'}} >
            <Box id='loginBox' size='auto' separator='all' justify='center' margin={{vertical: 'large', horizontal: 'medium'}}  pad={{'horizontal': 'medium', vertical:'medium', between:'small'}} >
              <Heading tag='h2' align='center'>{this.props.appName}</Heading>
                <Box alignSelf='center' align='center' >{authProgress ? <Spinning /> : null}</Box>
              <Form>
                <FormFields>
                  <FormField label='User Name'>
                    <input type='text' name='email' value={email} onChange={this._onChange} />
                  </FormField>
                  <FormField label='Password'>
                    <input type='password' name='password' value={password} onChange={this._onChange} />
                  </FormField>
                </FormFields>
                <a style={{color:'blue'}} onClick={this._toggleDialog}>Forgot password?</a>
                <p style={{color:'red'}} >{errorMsg}</p>
                <Footer pad={{'vertical': 'small'}}>
                  <Button label='Login' fill={true} primary={true}  onClick={this._onLogin} />
                  
                </Footer>
              </Form>
              <Box alignSelf='center' margin='none'>
                <Heading tag='h5'> Copyright (c) 2017 Jaza Software (OPC) Private Limited</Heading>
              </Box>
            </Box>
          </Box>

          <Dailog 
            active={this.state.dialogActive}
            onSubmit={this._resetPassword}
            onCancel={this._toggleDialog} 
            >
            {forgotPasswordConetent}
          </Dailog>
          <TSnackbar />
          <GNotification />
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
  return {routing: store.routing, auth: store.auth, form: store.form};
};

export default withRouter(connect(select)(Login));
