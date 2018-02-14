import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Layer from 'grommet/components/Layer';

class Dailog extends Component {
  render() {
    const {active, title, size, height, onSubmit, onCancel, children} = this.props;
    let titleContent;
    if (title) {
      titleContent = (
        <Box>
          <Header><Heading tag='h3'>{title}</Heading></Header>
        </Box>
      );
    }
    let submitItem;
    if (onSubmit) {
      submitItem = (<Box><Button label='Submit' plain={true} onClick={onSubmit} /></Box>);
    }
    return (
      <Layer hidden={!active} flush={true} >
        <Box size={size} margin={{vertical: 'small', horizontal:'medium'}}>
          {titleContent}
          
          <Box style={{height, overflow: 'auto'}}>
            {children}
          </Box>

          <Box pad={{vertical: 'medium'}} direction='row' justify='end'>
            <Box><Button label='Cancel' plain={true} onClick={onCancel} /></Box>
            {submitItem}
          </Box>
        </Box>
      </Layer>
    );
  }
}

Dailog.propTypes = {
  active: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small','medium','large','xlarge','xxlarge']),
  height: PropTypes.number
};

Dailog.defaultProps = {
  size: 'medium',
  height: 500
};

export default Dailog;