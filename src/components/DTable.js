import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import TableCell from './GTableCell';
import TableHeader from 'grommet/components/TableHeader';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import TrashIcon from 'grommet/components/icons/base/Trash';
import Dialog from './Dailog';

const cellWidth = {
  small: 100,
  medium: 150,
  large: 200,
  xlarge: 250
};

const cellBasis = {
  small: '1/4',
  medium: '1/2',
  large: '3/4',
  xlarge: '3/4'
};

class DTable extends Component {

  constructor () {
    super();
  }

  _onRemove (index) {
    if (this.props.onRemove) {
      this.props.onRemove(index);
    }
  }

  _onInputChange (index, name, action, event) {
    if (action) {
      action(index, name, event);
    }
  }

  _onToggleChange (index, name, action, event) {
    if (action) {
      action(index, name, event);
    }
  }

  render() {
    const { headers, elements, removeControl, container } = this.props;

    let contents;
    if (container == 'table') {
      const rowItems = elements.map((rowItem, idx)=> {

        const colItems = rowItem.map((colItem, i) => {
          let cell;
          if (colItem.type == 'label') {
            let width = (colItem.width == undefined) ? cellWidth.medium : cellWidth[colItem.width];
            cell = (
              <TableCell key={i} ><h4 style={{marginTop: 15, width}}>{colItem.label}</h4></TableCell>
            );
          }
          if (colItem.type == 'input') {
            let width = (colItem.width == undefined) ? cellWidth.medium : cellWidth[colItem.width];
            cell = (
              <TableCell key={i}>
                <input type='text' name={colItem.name} value={colItem.value} style={{width}} onChange={this._onInputChange.bind(this, idx, colItem.name, colItem.action)}  />
              </TableCell>
            );
          }
          if (colItem.type == 'checkbox') {
            let width = (colItem.width == undefined) ? cellWidth.medium : cellWidth[colItem.width];
            cell = (
              <TableCell key={i}>
                <CheckBox label={colItem.label} checked={colItem.value}  toggle={true} onChange={this._onToggleChange.bind(this, idx, colItem.name, colItem.action)}/>
              </TableCell>
            );
          }
          return cell;
        });

        if (removeControl) {
          colItems.push((<TableCell key={colItems.length} style={{textAlign: 'right'}} ><Button icon={<TrashIcon />} onClick={this._onRemove.bind(this, idx)}/> </TableCell>));
        }

        return (
          <TableRow key={idx}>
            {colItems}
          </TableRow>
        );
      });

      let header;
      if (headers != undefined) {
        if (removeControl) {
          header = (
            <thead>
              <tr>
                {headers.map((h, i) => {
                  let cell;
                  if (i == (headers.length-1)) {
                    cell = (<th key={i} style={{textAlign: 'right'}}>{h}</th>);
                  } else {
                    cell = (<th key={i} >{h}</th>);
                  }
                  return cell;
                })}
              </tr>
            </thead>
          )
        } else {
          header = (<TableHeader labels={headers} />);
        }
      }
      
      if (elements.length != 0) {
        contents = (
          <Table>
            {header}
            <tbody>
              {rowItems}
            </tbody>
          </Table>
        );
      }
    }

    if (container == 'list') {
      const rowItems = elements.map((rowItem, idx)=> {

        const colItems = rowItem.map((colItem, i) => {
          let cell;
          if (colItem.type == 'label') {
            let basis = (colItem.width == undefined) ? cellBasis.medium : cellBasis[colItem.width];
            cell = (
              <Box key={i} basis={basis} alignSelf='center' >{colItem.label}</Box>
            );
          }
          if (colItem.type == 'input') {
            let basis = (colItem.width == undefined) ? cellBasis.medium : cellBasis[colItem.width];
            cell = (
              <Box key={i} basis={basis} alignSelf='center'>
                <input type='text' name={colItem.name} value={colItem.value} style={{width}} onChange={this._onInputChange.bind(this, idx, colItem.name, colItem.action)}  />
              </Box>
            );
          }
          if (colItem.type == 'checkbox') {
            let basis = (colItem.width == undefined) ? cellBasis.medium : cellBasis[colItem.width];
            cell = (
              <Box key={i} basis={basis}  alignSelf='center' >
                <CheckBox label={colItem.label} checked={colItem.value}  toggle={true} onChange={this._onToggleChange.bind(this, idx, colItem.name, colItem.action)}/>
              </Box>
            );
          }
          return cell;
        });

        if (removeControl) {
          colItems.push((<Box key={colItems.length} basis='xsmall' align='end' ><Button icon={<TrashIcon />} onClick={this._onRemove.bind(this, idx)}/> </Box>));
        }

        return (
          <ListItem key={idx} pad={{horizontal: 'none'}}>
            <Box full='horizontal' alignSelf='center' direction='row' justify='between'  >
              {colItems}
            </Box>
          </ListItem>
        );
      });

      contents = (
        <List>
          {rowItems}
        </List>
      );
    }

    return (
      <Box>
        {contents}
      </Box>
    );
  }
}

const headerType = PropTypes.oneOfType([PropTypes.string, PropTypes.object]);

DTable.propTypes = {
  collectionKey: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(String),
  elements: PropTypes.array.isRequired,
  removeControl: PropTypes.bool,
  onRemove: PropTypes.func,
  container: PropTypes.oneOf(['table', 'list'])
};

DTable.defaultProps = {
  removeControl: false,
  container: 'table'
};

const select = (store) => {
  return {form: store.form, err: store.err};
};

export default connect(select)(DTable);

/*
  elements: array of (array of Objects)
  [
    {
      key: string
      type: label|input|checkbox|date
      name: string                    required
      label: string    for type label
      defaultValue:    for type checkbox|input
      action: func
      width: small|medium|large|xlarge
    }
  ]
*/