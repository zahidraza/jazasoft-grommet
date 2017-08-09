import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {getArrayFromCsv} from '../utils/utility';
import { FILTER_COUNT } from '../actions/filterActions';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import TableHeader from 'grommet/components/TableHeader';
import TableCell from './GTableCell';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

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

    const tableHeaders = this.props.headers.map(h => (typeof h === 'string') ? h : h.label);
    const keys = this.props.headers.map(h => (typeof h === 'string') ? h : h.key);
    let onMore;
    if (data.length < filteredTotal) {
      onMore = this._onMore;
    }

    let contents;
    if (this.props.container == 'table') {
      const items = data.map((item, idx)=> {
        const cells = keys.map((key, i) => {
          return (
            <TableCell key={i}>{item[key]}</TableCell>
          );
        })
        return (
          <TableRow key={idx}>
            {cells}
          </TableRow>
        );
      });

      contents = (
        <Table onMore={onMore}>
          <TableHeader labels={tableHeaders} />
          <tbody>
            {items}
          </tbody>
        </Table>
      );
    }
    
    if (this.props.container == 'list') {
      const items = data.map((item, idx)=> {
        const cells = keys.map((key, i) => {
          return (
            <Box basis='1/2' key={i}>{item[key]}</Box>
          );
        })
        return (
          <ListItem key={idx}>
            <Box full='horizontal' alignSelf='center' direction='row' justify='between'>
              {cells}
            </Box>
          </ListItem>
        );
      });

      contents = (
        <List onMore={onMore}>
          {items}
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

GTable.propTypes = {
  headers: PropTypes.arrayOf(headerType).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number,
  container: PropTypes.oneOf(['table','list'])
};

GTable.defaultProps = {
  pageSize: 15,
  container: 'table'
};

const select = (store) => ({filter: store.filter});

export default connect(select)(GTable);

/*
header: array of object {key,value} or array of key string
[
  {key: string, label: string} or key: string
]


data: array of objects
[
  Object
]
*/
