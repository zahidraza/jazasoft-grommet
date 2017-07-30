import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  render() {
    const {email, password} = this.state;
    return (
      <App>
        <Box pad={{horizontal: 'large', vertical: 'large'}} wrap={true}  full='vertical' texture='url(/andon-system/static/img/cover.jpg)' >
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
                  <Button label='Login' fill={true} primary={true}  onClick={()=> window.sessionStorage.isLoggedIn = true} />
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

export default Login;