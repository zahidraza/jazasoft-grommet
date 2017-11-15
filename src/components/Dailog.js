import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Layer from 'grommet/components/Layer';

class Dailog extends Component {
  render() {
    const {active, title} = this.props;
    let titleContent;
    if (title) {
      titleContent = (
        <Box>
          <Header><Heading tag='h3'>{title}</Heading></Header>
        </Box>
      );
    }
    let submitItem;
    if (this.props.onSubmit) {
      submitItem = (<Box><Button label='Submit' plain={true} onClick={this.props.onSubmit} /></Box>);
    }
    return (
      <Layer hidden={!active} flush={true} >
        <Box size={this.props.size} margin={{vertical: 'small', horizontal:'medium'}}>
          {titleContent}
          
          <Box style={{height: 500, overflow: 'auto'}}>
            {this.props.children}
          </Box>

          <Box pad={{vertical: 'medium'}} direction='row' justify='end'>
            <Box><Button label='Cancel' plain={true} onClick={this.props.onCancel} /></Box>
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
  size: PropTypes.oneOf(['small','medium','large','xlarge','xxlarge'])
};

Dailog.defaultProps = {
  size: 'medium'
};

export default Dailog;