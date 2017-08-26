import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import { withRouter } from 'react-router';

class MenuItemLink extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  handleClick = () => {
    this.props.history.push(this.props.to);
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    return (
        <Anchor style={{color: '#ffffff'}} className={this.props.className} label={this.props.label} onClick={this.handleClick} />
    );
  }
}

MenuItemLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

MenuItemLink.defaultProps = {
  className: ''
};

export default withRouter(MenuItemLink);
