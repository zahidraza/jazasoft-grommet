import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Title from 'grommet/components/Title';

class GAppHeader extends Component {

  constructor () {
    super();
    this._onClick = this._onClick.bind(this);
  }

  _onClick () {
    if (this.props.onMenuOpen) {
      this.props.onMenuOpen();
    }
  }

  render() {
    return (
      <Header size='large' justify='between' colorIndex='neutral-1-a' pad={{horizontal: 'medium'}}>
        <Title>
          <Button icon={<MenuIcon />} onClick={this._onClick}  /> {this.props.appName}
        </Title>
        <Menu direction='row' align='center' responsive={false}>
          <Anchor path='/profile'>Md Zahid Raza</Anchor>
          <Anchor path='/' >Logout</Anchor>
        </Menu>
      </Header>
    );
  }
}
GAppHeader.propTypes = {
  onMenuOpen: PropTypes.func,
  appName: PropTypes.string.isRequired
};

export default GAppHeader;
