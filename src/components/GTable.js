import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {getArrayFromCsv, splitCamelCase} from '../utils/utility';
import { FILTER_COUNT } from '../actions/filterActions';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import TableHeader from 'grommet/components/TableHeader';
import TableCell from './GTableCell';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import ViewIcon from 'grommet/components/icons/base/View';
import EditIcon from 'grommet/components/icons/base/Edit';
import TrashIcon from 'grommet/components/icons/base/Trash';
import ArchiveIcon from 'grommet/components/icons/base/Archive';

import Tooltip from 'react-toolbox/lib/tooltip';
const THeadTooltip = Tooltip('th');

const cellWidth = {
  small: 100,
  medium: 150,
  large: 200,
  xlarge: 250
};

class GTable extends Component {
 
  constructor() {
    super();
    this.state = {
      page: 1,
      data: [],
      filteredTotal: 0
    };

    this._loadData = this._loadData.bind(this);
    this._onMore = this._onMore.bind(this);
  }

  componentWillMount() {
    const { data, headers, filter: {filter}} = this.props;
    this._loadData(data, filter, this.state.page);
  }

  componentWillReceiveProps(nextProps) {
    const { data, filter: {filter, toggleCount}} = nextProps;
    if (this.props.filter.toggleCount == toggleCount) {
      this._loadData(data, filter, this.state.page);
    }
  }

  _onClick (action, index, event) {
    if (this.props.onClick) {
      this.props.onClick(action, index, event);
    }
  }
  
  /*
    table data being filtered must have key in object which is same as key in filter reducer
  */
  _loadData (data, filter, page) {
    const unfilteredTotal = data.length;
    for (let key in filter) {
      if ({}.hasOwnProperty.call(filter, key)) {
        const selectedFilter = filter[key];
        //handle case where data filter field has comma separated multiple values
        data = data.filter(d => {
          let result = false;
          getArrayFromCsv(d[key]).forEach(item => {
            if (selectedFilter.includes(item)) result = true;
          })
          return result;
        });
      }
    }
    const filteredTotal = data.length;
    data = data.slice(0, page * this.props.pageSize);
    this.setState({data, page, filteredTotal});
    this.props.dispatch({type: FILTER_COUNT, payload: {filteredTotal, unfilteredTotal}});
  }

  _onMore () {
    const { data, filter: {filter}} = this.props;
    this._loadData(data, filter, this.state.page+1);
  }
  

  render() {
    const { data, filteredTotal } = this.state;
    const { headers, scope } = this.props;

    let tableHeaders = [], keys = [];
    headers.forEach(h => {
      if (typeof h === 'string') {
        tableHeaders.push(h);
        keys.push(h);
      } else {
        const {label, tooltip, key, width} = h;
        tableHeaders.push({label, tooltip, width});
        keys.push(key);
      }
    });

    let onMore;
    if (data.length < filteredTotal) {
      onMore = this._onMore;
    }

    let contents;
    if (this.props.container == 'table') {
      if (data.length == 0) {
        contents = (
          <Box alignSelf='center' >No Data Available.</Box>
        );
      } else {
        const header = tableHeaders.map((h, i)=> {
          let result;
          if (typeof h === 'string') {
            result = (<th key={i} style={{width: cellWidth.medium, fontWeight: 'bold'}} >{splitCamelCase(h)}</th>);
          } else {
            let width = (h.width == undefined) ? cellWidth.medium : cellWidth[h.width];
            const tooltip = h.tooltip;
            if (tooltip != undefined) {
              result = (<THeadTooltip key={i} tooltipPosition='top' tooltip={tooltip} style={{width, fontWeight: 'bold'}} > {splitCamelCase(h.label)}</THeadTooltip>);
            } else {
              result = (<th key={i} style={{width, fontWeight: 'bold'}} >{splitCamelCase(h.label)}</th>);
            }
          }
          return result;
        })
        if (scope != 'none') {
          header.push(<th key={tableHeaders.length} style={{fontWeight: 'bold'}}>Action</th>);
        }

        const items = data.map((item, idx)=> {
          let cells = keys.map((key, i) => {
            return (
              <TableCell key={i}  >{(typeof item[key] === 'undefined' || (typeof item[key] === 'string' && item[key].length == 0)) ? '-' : item[key]}</TableCell>
            );
          })
          if (scope != 'none') {
            let actions = [];
            if (scope.includes('read')) {
              actions.push(<Button key='1' icon={<ViewIcon />} onClick={this._onClick.bind(this, 'read', idx)} />);
            }
            if (scope.includes('update')) {
              actions.push(<Button key='2' icon={<EditIcon />} onClick={this._onClick.bind(this, 'update', idx)} />);
            }
            if (scope.includes('archive')) {
              actions.push(<Button key='3' icon={<ArchiveIcon />} onClick={this._onClick.bind(this, 'archive', idx)} />);
            }
            if (scope.includes('delete')) {
              actions.push(<Button key='4' icon={<TrashIcon />} onClick={this._onClick.bind(this, 'delete', idx)} />);
            }
            let width = (actions.length == 1 ? cellWidth.small: (actions.length == 2 ? cellWidth.medium : (actions.length == 3) ? cellWidth.large: cellWidth.xlarge));
            cells.push(<TableCell key={keys.length} style={{width}} >{actions}</TableCell>);  
          }
          return (
            <TableRow key={idx}>
              {cells}
            </TableRow>
          );
        });

        contents = (
          <Table onMore={onMore}>
            <thead><tr>{header}</tr></thead>
            <tbody>
              {items}
            </tbody>
          </Table>
        );
      }
    }

    if (this.props.container == 'list') {
      const items = data.map((item, idx)=> {
        const cells = keys.map((key, i) => {
          return (
            <Box basis='3/4' key={i} alignSelf='center'>{item[key]}</Box>
          );
        });

        if (scope != 'none') {
          let actions = [];
          if (scope.includes('read')) {
            actions.push(<Button key='1' icon={<ViewIcon />} onClick={this._onClick.bind(this, 'read', idx)} />);
          }
          if (scope.includes('update')) {
            actions.push(<Button key='2' icon={<EditIcon />} onClick={this._onClick.bind(this, 'update', idx)} />);
          }
          if (scope.includes('archive')) {
            actions.push(<Button key='3' icon={<ArchiveIcon />} onClick={this._onClick.bind(this, 'archive', idx)} />);
          }
          if (scope.includes('delete')) {
            actions.push(<Button key='4' icon={<TrashIcon />} onClick={this._onClick.bind(this, 'delete', idx)} />);
          }
          cells.push(<Box direction='row' key={keys.length} basis='1/4' justify='end' >{actions}</Box>);  
        }

        return (
          <ListItem key={idx}>
            <Box full='horizontal' alignSelf='center' direction='row' justify='between'>
              {cells}
            </Box>
          </ListItem>
        );
      });

      contents = (
        <Box alignSelf='center' size={this.props.width}>
          <List onMore={onMore}>
            {items}
          </List>
        </Box>
      );
    }

    return (
      <Box full={this.props.full} colorIndex={this.props.colorIndex} size={this.props.width} pad={{horizontal: 'medium'}} align='center'>
        {contents}
      </Box>
    );
  }
}

const headerType = PropTypes.oneOfType([PropTypes.string, PropTypes.object]);

GTable.propTypes = {
  headers: PropTypes.arrayOf(headerType).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number,
  container: PropTypes.oneOf(['table','list']),
  scope: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  full: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  colorIndex: PropTypes.string
};

GTable.defaultProps = {
  pageSize: 15,
  container: 'table',
  width: 'auto',
  scope: 'none',
  full: false,
  colorIndex: 'light-1'
};

const select = (store) => ({filter: store.filter});

export default connect(select)(GTable);

/*
header: array of object {key,value} or array of key string
[
  {key: string, label: string, tooltip: string} or key: string
]

data: array of objects
[
  Object
]
scope: none or comma separated [read,update,delete,archive]
*/
