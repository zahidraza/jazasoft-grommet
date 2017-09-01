import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {splitCamelCase} from '../utils/utility';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

class GObject extends Component {
 
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  _onClick (action) {
    if (action == 'back' && this.props.backUrl != undefined) {
      this.props.history.push(this.props.backUrl);
    } 
    if (action == 'edit' && this.props.editUrl != undefined) {
      this.props.history.push(this.props.editUrl);
    }
  }

  render() {
    const { data, collectionData, column, width, colorIndex, boldKey, backUrl, editUrl } = this.props;
    const keyWeight = boldKey ? 'bold' : 'normal';
    let content1, content2;
    if (data != undefined) {
      let items = [];
      
      if (column > 1) {
        for (let i = 0; i < data.length; i += column) {
          let cells = [];
          for (let j = i; j < i+column; j++) {

            cells.push(
              <Box basis='3/4' key={10*j} style={{fontWeight: keyWeight}}>
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
      }
      if (column == 1) {
        data.forEach((e, idx) => {
          let item = (
            <ListItem key={idx} justify="between" pad={{vertical:'small',horizontal:'small'}} >
              <span style={{fontWeight: keyWeight}} > {e.key} </span>
              <span className="secondary">{e.value}</span>
            </ListItem>
          );
          items.push(item);
        });
      }

      content1 = (
        <Box colorIndex={colorIndex} size={width} alignSelf='center' justify='center' margin={{vertical: 'medium'}}>
          <List>
            {items}
          </List>
        </Box>
      );
    }
    let collections = [];
    if (collectionData != undefined) {
      
      collectionData.forEach((e, idx) => {
        let rows = [];
        let item = (
          <ListItem key={idx} justify="between" pad={{vertical:'small',horizontal:'small'}} >
            <span style={{fontWeight: keyWeight}} > {e.key} </span>
            <span className="secondary"></span>
          </ListItem>
        );
        rows.push(item);

        e.values.forEach((v, i) => {
          let key, value;
          if (typeof v == 'string') {
            value = v;
          } else {
            key = v.key;
            value = v.value;
          }
          let item = (
            <ListItem key={100*idx+i+100} justify="between" pad={{vertical:'small',horizontal:'small'}} >
              <span>{key != undefined ? splitCamelCase(key) : ''} </span>
              <span className="secondary"> {value} </span>
            </ListItem>
          );
          rows.push(item);
        });
        const row = (
          <Box key={idx} colorIndex={colorIndex} size={width} alignSelf='center' justify='center' margin={{vertical: 'medium'}}>
            <List>
              {rows}
            </List>
          </Box>
        );
        collections.push(row);
      });
    }

    let footer;
    if (backUrl != undefined || editUrl != undefined) {
      let justify = 'center';
      if (backUrl != undefined && editUrl != undefined) {
        justify = 'between';
      }
      const editControl = editUrl != undefined ? <Button label='Edit'  onClick={this._onClick.bind(this, 'edit')} /> : null;
      const backControl = backUrl != undefined ? <Button label='Back'  onClick={this._onClick.bind(this, 'back')} /> : null;
      footer = (
        <Footer pad={{'vertical': 'medium'}} justify={justify} >
          {editControl}
          {backControl}
        </Footer>
      );
    }

    return (
      <Box alignSelf='center' >
        {content1}
        {collections}
        {footer}
      </Box>
    );
  }
}

const headerType = PropTypes.oneOfType([PropTypes.string, PropTypes.object]);

GObject.propTypes = {
  data: PropTypes.array,
  column: PropTypes.number,
  collectionData: PropTypes.array,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  colorIndex: PropTypes.string,
  boldKey: PropTypes.bool,
  backUrl: PropTypes.string,
  editUrl: PropTypes.string
};

GObject.defaultProps = {
  column: 1,
  width: 'xlarge',
  colorIndex: 'light-1',
  boldKey: false
};

export default withRouter(GObject);

/*
  data: array of object: {key: string, value: string}
  collectionData: [
    {key: string, values: string | {key: , value: }}
  ]

*/
