import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Button from 'grommet/components/Button';
import Menu from 'grommet/components/Menu';
import Close from 'grommet/components/icons/base/Close';
import Link from './MenuItemLink';

class TSidebar extends Component {
  constructor () {
    super();
    this._onClose = this._onClose.bind(this);
  }

  _onClose () {
    if (this.props.onHide) {
      this.props.onHide();
    }
  }

  render() {
    const { links, location } = this.props;

    var items = links.map((link, index) => {
      var value = (`/${link.path}` == location.pathname) ? 'active' : '';
      return (
        <Link className={value} key={link.label} to={link.path} label={link.label} />
      );
    });

    return (
      <Sidebar colorIndex='neutral-1' size='small'>
        <Header pad='medium' justify='between' >
          <Title>App</Title>
          <Button icon={<Close />} onClick={this._onClose} />
        </Header>
        <Menu fill={true} primary={true}>
          {items}
        </Menu>
      </Sidebar>
    );
  }
}

export default withRouter(TSidebar);