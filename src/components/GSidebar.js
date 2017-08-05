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
  }

  render() {
    const { links, location, fixed } = this.props;

    var items = links.map((link, index) => {
      var value = (`/${link.path}` == location.pathname) ? 'active' : '';
      return (
        <Link className={value} key={link.label} to={link.path} label={link.label} />
      );
    });

    return (
      <Sidebar colorIndex='neutral-1' size='small' fixed={fixed}>
        <Header pad='medium' justify='between' >
          <Title>{this.props.appShortName}</Title>
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
  fixed: PropTypes.bool
};

GSidebar.defaultProps = {
  fixed: false
};


export default withRouter(GSidebar);