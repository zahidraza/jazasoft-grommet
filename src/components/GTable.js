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
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';

import Tooltip from 'react-toolbox/lib/tooltip';
const THeadTooltip = Tooltip('th');
const ButtonTooltip = Tooltip((props) => {
  const {theme, ...restProps} = props;
  return <Button {...restProps} />;
});

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
      filteredTotal: 0,
      searching: false
    };

    this._loadData = this._loadData.bind(this);
    this._onMore = this._onMore.bind(this);
  }

  componentWillMount() {
    const { data, headers, filter: {filter, sort}} = this.props;
    this._loadData(data, filter, sort, this.state.page);
  }

  componentWillReceiveProps(nextProps) {
    const { data, filter: {filter, sort, toggleCount, searchValue}} = nextProps;
    //Do not do anything if component receives props because of filter total change
    if (this.props.filter.toggleCount == toggleCount) {
      if (searchValue.trim().length != 0) {
        this.setState({searching: true});
        this._onSearch(data, searchValue, sort);
      } else {
        this.setState({searching: false});
        this._loadData(data, filter, sort, this.state.page);
      }
    }
  }

  _onClick (action, index, event) {
    if (this.props.onClick) {
      const id = this.state.data[index].id;
      this.props.onClick(action, id, event);
    }
  }

  _onSearch (data, searchValue, sort) {
    const {searchKeys} = this.props;

    data = data.filter(e => {
      let result = false;
      searchKeys.forEach(k => {
        if (e[k].toLowerCase().includes(searchValue.toLowerCase())) {
          result = true;
        }
      });
      return result;
    });
    this._loadData(data, {}, sort, 1);
  }
  
  /*
    table data being filtered must have key in object which is same as key in filter reducer
  */
  _loadData (data, filter, sort, page) {
    const unfilteredTotal = data.length;
    for (let key in filter) {
      if ({}.hasOwnProperty.call(filter, key)) {
        const selectedFilter = filter[key];
        //handle case where data filter field has comma separated multiple values
        data = data.filter(d => {
          let result = false;
          if (typeof d[key] === 'string') {
            getArrayFromCsv(d[key]).forEach(item => {
              if (selectedFilter.includes(item)) result = true;
            })
          } else {
            result = selectedFilter.includes(d[key]);
          }
          return result;
        });
      }
    }
    if (sort && sort.value) {
      data = data.sort((a,b) => {
        let result;
        if (!sort.type || sort.type == 'STRING' || sort.type == 'NUMBER') {
          if (sort.direction && sort.direction == 'desc') {
            result = (a[sort.value] > b[sort.value]) ? -1 : 1;
          } else {
            result = (a[sort.value] < b[sort.value]) ? -1 : 1;
          }
        }
        if (sort.type && sort.type == 'DATE') {
          if (sort.direction && sort.direction == 'desc') {
            result = (a[sort.value].getTime() > b[sort.value].getTime()) ? -1 : 1;
          } else {
            result = (a[sort.value].getTime() < b[sort.value].getTime()) ? -1 : 1;
          }
        }
        return result;
      });
    }
    
    const filteredTotal = data.length;
    data = data.slice(0, page * this.props.pageSize);
    this.setState({data, page, filteredTotal});
    this.props.dispatch({type: FILTER_COUNT, payload: {filteredTotal, unfilteredTotal}});
  }

  _onMore () {
    const {page, searching, data: stateData} = this.state;
    const { data, filter: {filter, sort}} = this.props;
    if (searching) {
      this._loadData(stateData, {}, sort, page+1);
    } else {
      this._loadData(data, filter, sort, page+1);
    }
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
    if (data.length == 0) {
      contents = (
        <Box alignSelf='center' >No Data Available.</Box>
      );
    } 
    if (this.props.container == 'table' && data.length > 0) {
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
      if (scope && scope.length > 0) {
        header.push(<th key={tableHeaders.length} style={{fontWeight: 'bold', textAlign: 'center'}}>Action</th>);
      }

      const items = data.map((item, idx)=> {
        let cells = keys.map((key, i) => {
          return (
            <TableCell key={i} style={{color: item.color}}  >{(typeof item[key] === 'undefined' || (typeof item[key] === 'string' && item[key].length == 0)) ? '-' : item[key]}</TableCell>
          );
        });

        if (scope && scope.length > 0) {
          let actions = [];
          scope.forEach((e, i) => {
            let icon, tooltip, action;
            if (typeof e === 'string') {
              action = e;
            } else {
              action = e.value;
              tooltip = e.tooltip;
            }
            if (action == 'read') {
              icon = <ViewIcon />;
            } else if (action == 'update') {
              icon = <EditIcon />
            } else if (action == 'archive') {
              icon = <ArchiveIcon />
            } else if (action == 'delete') {
              icon = <TrashIcon />
            } else if (action == 'next') {
              icon = <LinkNextIcon />
            }
            if (tooltip) {
              actions.push(<ButtonTooltip tooltip={tooltip} key={i} icon={icon} onClick={this._onClick.bind(this, action, idx)} />);
            } else {
              actions.push(<Button key={i} icon={icon} onClick={this._onClick.bind(this, action, idx)} />);
            }
          });
          let width = (actions.length == 1 ? cellWidth.small: (actions.length == 2 ? cellWidth.medium : (actions.length == 3) ? cellWidth.large: cellWidth.xlarge));
          cells.push(<TableCell key={keys.length} style={{width, textAlign: 'center'}} >{actions}</TableCell>);  
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

    if (this.props.container == 'list' && data.length > 0) {
      const items = data.map((item, idx)=> {
        const cells = keys.map((key, i) => {
          return (
            <Box basis='3/4' key={i} alignSelf='center'>{item[key]}</Box>
          );
        });

        if (scope) {
          let actions = [];
          scope.forEach((e, i) => {
            let icon, tooltip, action;
            if (typeof e === 'string') {
              action = e;
            } else {
              action = e.value;
              tooltip = e.tooltip;
            }
            if (action == 'read') {
              icon = <ViewIcon />;
            } else if (action == 'update') {
              icon = <EditIcon />
            } else if (action == 'archive') {
              icon = <ArchiveIcon />
            } else if (action == 'delete') {
              icon = <TrashIcon />
            } else if (action == 'next') {
              icon = <LinkNextIcon />
            }
            if (tooltip) {
              actions.push(<ButtonTooltip tooltip={tooltip} key={i} icon={icon} onClick={this._onClick.bind(this, action, idx)} />);
            } else {
              actions.push(<Button key={i} icon={icon} onClick={this._onClick.bind(this, action, idx)} />);
            }
          });
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
  scope: PropTypes.arrayOf(headerType),
  onClick: PropTypes.func,
  searchKeys: PropTypes.arrayOf(PropTypes.string),

  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  full: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  colorIndex: PropTypes.string
};

GTable.defaultProps = {
  pageSize: 15,
  container: 'table',
  width: 'auto',
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
  {color: , ...other_data}
]
scope: array of string or object {value: , tooltip}
values can be [read,update,delete,archive,next]


searchKeys: array of Strings. It is used with PageHeader Component. When user types something in seacrh of pageHeader, 
GTable receives that value via filterReducer and searches in the data available. 
So, It is required to mention which field to search for.

if scope is used, data must contain key id, as the value of id will be passed to onClick method
*/
