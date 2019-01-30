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
    this._onClick = this._onClick.bind(this);
  }

  _onClick () {
    if (this.props.toggleMenu) {
      this.props.toggleMenu();
    }
  }

  render() {
    const { links, location, fixed } = this.props;

    var items = links.map((link, index) => {
      var active = link.path === '' ? location.pathname === '/' : location.pathname.includes(link.path) ? true : false;
      return (
        <Link active={active}  key={link.label} to={`/${link.path}`} label={link.label} onClick={this._onClick} />
      );
    });

    return (
      <Sidebar style={{background: '#222b34'}} size='small' fixed={fixed}>
        <Header justify='between' alignSelf="center" style={{ padding: '34px 24px'}} >
          <Title style={{color: '#ffffff'}} >{this.props.appShortName}</Title>
        </Header>
        <Menu fill={true} primary={true}>
          {items}
        </Menu>
      </Sidebar>
    );
  }
}

GSidebar.propTypes = {
  links: PropTypes.array.isRequired,
  appShortName: PropTypes.string.isRequired,
  fixed: PropTypes.bool,
  toggleMenu: PropTypes.func
};

GSidebar.defaultProps = {
  fixed: false
};


export default withRouter(GSidebar);