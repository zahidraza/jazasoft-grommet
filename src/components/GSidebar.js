import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Button from 'grommet/components/Button';
import Menu from 'grommet/components/Menu';
import Close from 'grommet/components/icons/base/Close';
import Link from './MenuItemLink';

class GSidebar extends Component {

  constructor () {
    super();
    this._onClose = this._onClose.bind(this);
  }

  _onClose () {
    
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render () {
    const { links, location: { pathname } } = this.props;

    var items = links.map((link, index) => {
      var value = (`/${link.path}` == pathname) ? 'active' : '';
      return (
        <Link className={value} key={link.label} to={link.path} label={link.label} />
      );
    });
    return (
      <Sidebar colorIndex='neutral-1' size='small'>
        <Header pad='medium' justify='between' >
          <Title>App</Title>
          <Button icon={<Close />} />
        </Header>
        <Menu fill={true} primary={true}>
          <a href='#'>Home</a>
        </Menu>
      </Sidebar>
    );
  }
}

GSidebar.prototype = {
  onClose: PropTypes.func,
  links: PropTypes.array
}

export default withRouter(GSidebar);
