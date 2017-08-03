import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {userLogin} from '../actions/authActions';

import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';

class Login extends Component {

  constructor () {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this._onChange = this._onChange.bind(this);
    this._onLogin = this._onLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authenticated) {
      this.props.history.push('/');
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
    console.log(email);

    this.props.dispatch(userLogin(this.props.authClient, this.state.email, this.state.password));
  }

  render() {
    const {email, password} = this.state;
    return (
      <App>
        <Box pad={{horizontal: 'large', vertical: 'large'}} wrap={true}  full='vertical'  >
          <Box align='end' justify='end' pad={{'horizontal': 'large', vertical:'large', between:'large'}}>
            <Box size='auto'  align='center' separator='all' justify='center' colorIndex='light-1' pad={{'horizontal': 'medium', vertical:'medium', between:'medium'}} >
              <Heading >{this.props.title}</Heading>
              <Form>
                <FormFields>
                  <FormField label='Email'>
                    <input type='text' name='email' value={email} onChange={this._onChange} />
                  </FormField>
                  <FormField label='Password'>
                    <input type='password' name='password' value={password} onChange={this._onChange} />
                  </FormField>
                </FormFields>
                <Footer pad={{'vertical': 'small'}}>
                  <Button label='Login' fill={true} primary={true}  onClick={this._onLogin} />
                </Footer>
              </Form>
            </Box>
          </Box>
        </Box>
      </App>
    );
  }
}

Login.propTypes = {
  title: PropTypes.string.isRequired,
  onLogin: PropTypes.func
};

Login.defaultProps = {
  title: 'Sample Application'
};

let select = (store) => {
  return {routing: store.routing, auth: store.auth};
};

export default withRouter(connect(select)(Login));
