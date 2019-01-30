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

  state = {
    hover: false,
  };

  hoverOn = () => {
    this.setState({hover: true});
  };

  hoverOff = () => {
    this.setState({hover: false});
  };

  handleClick = () => {
    this.props.history.push(this.props.to);
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    const backgroundColor = this.props.active ? '#1d9cd9' : this.state.hover ? '#7a7f85' : undefined;
    return (
        <Anchor style={{color: '#ffffff', backgroundColor}}  label={this.props.label} onClick={this.handleClick} onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} />
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
