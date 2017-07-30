import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dashboard extends Component {
  render() {
    return (
      <div>
        Welcome to {this.props.title} App.
      </div>
    );
  }
}

Dashboard.prototype = {
  title: PropTypes.string.isRequired
};

export default Dashboard;