import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GTableCell extends Component {
  render() {
    const {children, ...rest} = this.props;
    return (
      <td {...rest}>
        {this.props.children}
      </td>
    );
  }
}

GTableCell.propTypes = {

};

export default GTableCell;