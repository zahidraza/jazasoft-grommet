import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import LinkDownIcon from 'grommet/components/icons/base/LinkDown';
import LinkUpIcon from 'grommet/components/icons/base/LinkUp';

class Label extends Component {

  _onFilter (type) {
    if (this.props.onFilter) {
      this.props.onFilter(type);
    }
  }

  render() {
    const {label, filterControl} = this.props;
    let filterAsc, filterDesc;
    if (filterControl) {
      if (filterControl.asc && filterControl.asc == true) {
        filterAsc = (<Box><Button icon={<LinkDownIcon />} onClick={this._onFilter.bind(this, 'asc')} /></Box>);
      }
      if (filterControl.desc && filterControl.desc == true) {
        filterDesc = (<Box><Button icon={<LinkUpIcon />} onClick={this._onFilter.bind(this, 'desc')}/></Box>);
      }
    }

    return (
      <Box direction='row' >
        <Box alignSelf='center' style={{fontSize: 18}} >{label}</Box>
        {filterAsc}
        {filterDesc}
      </Box>
    );
  }
}

Label.propTypes = {
  label: PropTypes.string.isRequired,
  filterControl: PropTypes.object,
  bold: PropTypes.bool,
  onFilter: PropTypes.func
};

Label.defaultProps = {
  bold: false
};

export default Label;

/*
  filterControl: {asc: bool, desc: bool}
*/