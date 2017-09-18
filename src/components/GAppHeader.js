import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {userLogout} from '../actions/authActions';

import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Title from 'grommet/components/Title';
import SyncIcon from 'grommet/components/icons/base/Sync';
import Tooltip from 'react-toolbox/lib/tooltip';

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
      <Header size='large' justify='between' style={{background: '#0b3c5d'}} pad={{horizontal: 'medium'}}>
        <Title style={{color: '#ffffff'}}>
          <Button icon={<MenuIcon />} onClick={this._onClick}  /> {this.props.appName}
        </Title>
        <Menu  direction='row' align='center' responsive={false}>
          <ButtonTooltip icon={<SyncIcon colorIndex='light-1' />} tooltip='Refresh Application' onClick={this.refreshApp} />
          <Anchor style={{color: '#ffffff'}} path='/profile'>{sessionStorage.name}</Anchor>
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
