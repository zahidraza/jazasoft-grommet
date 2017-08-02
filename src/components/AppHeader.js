import React, { Component } from 'react';

import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Title from 'grommet/components/Title';


class AppHeader extends Component {

  constructor () {
    super();
    this.openMenu = this.openMenu.bind(this);
  }

  openMenu () {
    console.log('Hello');
    if (this.props.onMenuOpen) {
      this.props.onMenuOpen();
    }
  }

  render () {

    let title = (
        <Title>
          <Button icon={<MenuIcon />} onClick={this.openMenu} />
          Sample App
        </Title>
    );
    

    let login = (
      <Menu direction='row' align='center' responsive={false}>
          <Anchor path='/profile'>Md Zahid Raza</Anchor>
          <Anchor path='/' >Logout</Anchor>
      </Menu>
    );



    return (
      <Header size='large' justify='between' colorIndex='neutral-1-a' pad={{horizontal: 'medium'}}>
        {title}
        {login}
      </Header>
    );
  }
}

export default AppHeader;
