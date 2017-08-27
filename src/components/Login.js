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
      errorMsg: ''
    };
    this._onChange = this._onChange.bind(this);
    this._onLogin = this._onLogin.bind(this);
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

  _onLogin () {
    const {email, password} = this.state;
    this.props.dispatch(userLogin(this.props.authClient, this.state.email, this.state.password));
  }

  render() {
    const { email, password, errorMsg } = this.state;
    const { authProgress } = this.props.auth;
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
