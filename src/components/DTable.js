import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import moment from 'moment';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import DateTime from 'grommet/components/DateTime';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import TableCell from './GTableCell';
import TableHeader from 'grommet/components/TableHeader';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import TrashIcon from 'grommet/components/icons/base/Trash';
import Dialog from './Dailog';

import Tooltip from 'react-toolbox/lib/tooltip';
const THeadTooltip = Tooltip('th');

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

  _onDateChange (index, name, action, value) {
    if (action) {
      action(index, name, value);
    }
  }

  _onToggleChange (index, name, action, event) {
    if (action) {
      action(index, name, event);
    }
  }

  render() {
    const { headers, elements, removeControl, container, err: {errors} } = this.props;
    let contents, error;
    let autoFocusG = false;
    if (container == 'table') {
      const rowItems = elements.map((rowItem, idx)=> {
        const colItems = rowItem.map((colItem, i) => {
          let cell, cellContent;;
          if (colItem.type == 'label') {
            let width = (colItem.width == undefined) ? cellWidth.medium : cellWidth[colItem.width];
            cell = (
              <TableCell key={i} ><h4 style={{marginTop: 15, width}}>{(typeof colItem.label !== 'string' || colItem.label.length == 0) ? ' - ' : colItem.label }</h4></TableCell>
            );
          }
          if (colItem.type == 'input') {
            let width = (colItem.width == undefined) ? cellWidth.medium : cellWidth[colItem.width];
            let border, autoFocusL = false;
            if (errors[idx] && errors[idx][colItem.name] && errors[idx][colItem.name].length != 0) {
              border = '1px solid red';
              if (!autoFocusG) {
                autoFocusG = true;
                autoFocusL = true;
                error = errors[idx][colItem.name];
              }
            }
            if (colItem.disabled && colItem.disabled == true) {
              cellContent = <h4 style={{marginTop: 15, width}}>{colItem.value == undefined || colItem.value.length == 0 ? '-' : colItem.value}</h4>
            } else {
              cellContent = <input type='text' autoFocus={autoFocusL}  name={colItem.name} value={colItem.value == undefined ? '' : colItem.value} style={{width, border}} onChange={this._onInputChange.bind(this, idx, colItem.name, colItem.action)}  />
            }
            cell = (
              <TableCell key={i}>
                {cellContent}
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
          if (colItem.type == 'date') {
            let width = (colItem.width == undefined) ? cellWidth.medium : cellWidth[colItem.width];
            if (colItem.disabled && colItem.disabled == true) {
              console.log(moment(colItem.value).format('DD MMM, YY'));
              let v = (typeof colItem.value == 'undefined' ? '-' : (typeof colItem.value == 'string' ? colItem.value : moment(colItem.value).format('DD MMM, YY')));
              cellContent = <h4 style={{marginTop: 15, width}}> {v} </h4>
              //cellContent = 'Hello';
            } else {
              cellContent = <DateTime name={colItem.name} format='DD MMM, YY' value={colItem.value} onChange={this._onDateChange.bind(this, idx, colItem.name, colItem.action)}/>
              //cellContent = 'Hello World';
            }
            cell = (
              <TableCell key={i}>
                {cellContent}
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
        header = headers.map((h, i) => {
          let result;
          if (typeof h === 'string') {
            result = (<th style={{fontWeight: 'bold'}}>{h}</th>);
          } else {
            const tooltip = h.tooltip;
            if (tooltip != undefined) {
              result = (<THeadTooltip key={i} tooltipPosition='top' tooltip={tooltip} style={{fontWeight: 'bold'}} > {h.label}</THeadTooltip>);
            } else {
              result = (<th style={{fontWeight: 'bold'}}>{h.label}</th>);
            }
          }
          return result;
        });
      }
      
      if (elements.length != 0) {
        contents = (
          <Table>
            <thead><tr>{header}</tr></thead>
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
            let border, autoFocusL = false;
            if (errors[idx] && errors[idx][colItem.name] && errors[idx][colItem.name].length != 0) {
              border = '1px solid red';
              if (!autoFocusG) {
                autoFocusG = true;
                autoFocusL = true;
                error = errors[idx][colItem.name];
              }
            }
            cell = (
              <Box key={i} basis={basis} alignSelf='center'>
                <input type='text' disabled={colItem.disabled == undefined ? false : colItem.disabled} name={colItem.name} value={colItem.value} style={{width, border}} onChange={this._onInputChange.bind(this, idx, colItem.name, colItem.action)}  />
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
          if (colItem.type == 'date') {
            let basis = (colItem.width == undefined) ? cellBasis.medium : cellBasis[colItem.width];
            cell = (
              <Box key={i} basis={basis}  alignSelf='center' >
                <DateTime name={colItem.name} disabled={colItem.disabled == undefined ? false : colItem.disabled} format='DD MMM, YY' value={colItem.value} onChange={this._onDateChange.bind(this, idx, colItem.name, colItem.action)}/>
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
        <Box>
          <p style={{color: 'red'}}>{error}</p>
        </Box>
        {contents}
      </Box>
    );
  }
}

const headerType = PropTypes.oneOfType([PropTypes.string, PropTypes.object]);

DTable.propTypes = {
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
  headers: it can be of type string or object : {label: string, tooltip: string};
  elements: array of (array of Objects)
  [
    {
      key: string
      type: label|input|checkbox|date
      name: string                    required
      label: string    for type label
      defaultValue:    for type checkbox|input
      action: func
      disabled: bool
      width: small|medium|large|xlarge
    }
  ]
*/