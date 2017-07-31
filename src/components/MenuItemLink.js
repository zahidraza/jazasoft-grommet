import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import { withRouter } from 'react-router';

export class MenuItemLink extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }

  handleClick = () => {
    this.props.history.push(this.props.to);
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    return (
        <Anchor label={this.props.label} onClick={this.handleClick} />
    );
  }
}

export default withRouter(MenuItemLink);
