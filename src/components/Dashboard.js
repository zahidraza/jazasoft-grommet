import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dashboard extends Component {
  render() {
    return (
      <div>
        Welcome to {this.props.appName}.
      </div>
    );
  }
}

Dashboard.prototype = {
  appName: PropTypes.string.isRequired
};

export default Dashboard;