import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GTableCell extends Component {
  render() {
    return (
      <td>
        {this.props.children}
      </td>
    );
  }
}

GTableCell.propTypes = {

};

export default GTableCell;