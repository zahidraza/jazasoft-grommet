import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

class GObject extends Component {
 
  constructor() {
    super();
  }

  render() {
    const { data, column, width, colorIndex } = this.props;

    let items = [];
    for (let i = 0; i < data.length; i += column) {
      let cells = [];
      for (let j = i; j < i+column; j++) {
        cells.push(
          <Box basis='3/4' key={10*j} style={{fontWeight: 'bold'}}>
            { data[j] != undefined ? data[j].key : ''}
          </Box>
        );
        cells.push(<Box basis='3/4' key={10*j+1}>{data[j] != undefined ? data[j].value : ''}</Box>)
      }
      let row = (
        <ListItem key={i}>
            <Box full='horizontal' alignSelf='center' direction='row' justify='between'>
              {cells}
            </Box>
          </ListItem>
      );
      items.push(row);
    }

    let contents;

    return (
      <Box colorIndex={colorIndex} size={width} alignSelf='center' justify='center' margin={{vertical: 'medium'}}>
        <List>
          {items}
        </List>
      </Box>
    );
  }
}

const headerType = PropTypes.oneOfType([PropTypes.string, PropTypes.object]);

GObject.propTypes = {
  data: PropTypes.array.isRequired,
  column: PropTypes.number,
  width: PropTypes.oneOfType(PropTypes.string, PropTypes.object),
  colorIndex: PropTypes.string
};

GObject.defaultProps = {
  column: 2,
  width: 'xlarge',
  colorIndex: 'light-1'
};

const select = (store) => ({filter: store.filter});

export default connect(select)(GObject);

/*
  data: array of object: {key: string, value: string}
*/
