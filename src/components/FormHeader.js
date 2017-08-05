import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Spinning from 'grommet/components/icons/Spinning';

class FormHeader extends Component {
  render() {
    const { title, busy } = this.props;
    return (
      <Header justify='between'>
        <Heading tag='h3' strong={true}>{title}</Heading>
        <Box pad={{horizontal: 'small'}}>
          {busy ? <Spinning /> : null}
        </Box>
      </Header>
    );
  }
}

FormHeader.propTypes = {
  title: PropTypes.string.isRequired,
  busy: PropTypes.bool
};

FormHeader.defaultProps = {
  busy: false
};

export default FormHeader;