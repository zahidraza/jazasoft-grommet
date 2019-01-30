import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {userLogout} from '../actions/authActions';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
// import MenuIcon from 'grommet/components/icons/base/Menu';
import Title from 'grommet/components/Title';
import SyncIcon from 'grommet/components/icons/base/Sync';
import Tooltip from 'react-toolbox/lib/tooltip';
import SVGIcon from 'grommet/components/SVGIcon';

const MenuIcon = (
  <SVGIcon viewBox='0 0 24 24'
    version='1.1'
    type='logo'
    a11yTitle='Menu'
    style={{ width: 32, height: 32 }}>
  <path fill="#fff" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
  </SVGIcon>
);

const ButtonTooltip = Tooltip((props) => {
  const {theme, ...restProps} = props;
  return <Button {...restProps} />;
});

class GAppHeader extends Component {

  constructor () {
    super();
    this._onClick = this._onClick.bind(this);
    this._onLogout = this._onLogout.bind(this);
    this.refreshApp = this.refreshApp.bind(this);
  }

  _onClick () {
    if (this.props.toggleMenu) {
      this.props.toggleMenu();
    }
  }

  _onLogout() {
    this.props.dispatch(userLogout(this.props.authClient));
  }

  refreshApp () {
    this.props.dispatch({type: 'REFRESH_APP'});
  }

  render() {
    const {authClient} = this.props;
    let logout;
    if (authClient) {
      logout = (<Anchor style={{color: '#ffffff'}} path='/login' onClick={this._onLogout} >Logout</Anchor>);
    }
    return (
      <Header size='large' justify='between' style={{background: '#2c353c'}} pad={{horizontal: 'small'}}>
        <Box direction="row" justify="center">
          <Box alignSelf="center"><Button icon={MenuIcon}  onClick={this._onClick} style={{marginTop: 4}}  /></Box>
          <Box alignSelf="center" ><Title style={{color: '#ffffff', fontWeight: 400}}>{this.props.appName}</Title></Box>
        </Box>
        
        <Menu  direction='row' align='center' responsive={false}>
          <ButtonTooltip icon={<SyncIcon colorIndex='light-1' />} tooltip='Refresh Application' onClick={this.refreshApp} />
          <Anchor style={{color: '#ffffff'}} path='/profile'>{localStorage.firstName + ' ' + localStorage.lastName}</Anchor>
          {logout}
        </Menu>
      </Header>
    );
  }
}
GAppHeader.propTypes = {
  toggleMenu: PropTypes.func,
  appName: PropTypes.string.isRequired
};

const select = (store) => ({});

export default connect(select)(GAppHeader);
