import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';

import { getArrayFromCsv, splitCamelCase, denormalise } from '../utils/utility';
import { FILTER_COUNT, PAGE_CHANGE } from '../actions/filterActions';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import GTable from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import TableHeader from 'grommet/components/TableHeader';
import TableCell from './GTableCell';
import ViewIcon from 'grommet/components/icons/base/View';
import EditIcon from 'grommet/components/icons/base/Edit';
import TrashIcon from 'grommet/components/icons/base/Trash';
import ArchiveIcon from 'grommet/components/icons/base/Archive';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import CirclePlayIcon from 'grommet/components/icons/base/CirclePlay';
import DownloadIcon from 'grommet/components/icons/base/Download';

import Tooltip from 'react-toolbox/lib/tooltip';
const THeadTooltip = Tooltip('th');
const ButtonTooltip = Tooltip(props => {
  const { theme, ...restProps } = props;
  return <Button {...restProps} />;
});

const cellWidth = {
  small: 100,
  medium: 150,
  large: 200,
  xlarge: 250
};

const defaultCellStyle = {
  color: 'black',
  width: 150
};

class Table extends Component {
  constructor() {
    super();
    this.debouncedNextPage = debounce(this.nextPage.bind(this), 1000);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this._loadData();
  }

  componentWillReceiveProps(nextProps) {
    const {
      data,
      filter: { searchValue, filter },
      totalElements
    } = nextProps;
    if (
      !isEqual(this.props.data, data) ||
      this.props.totalElements !== totalElements ||
      this.props.filter.searchValue !== searchValue ||
      !isEqual(this.props.filter.filter, filter)
    ) {
      this._loadData(nextProps);
    }
  }

  _loadData(props = this.props) {
    let {
      data,
      cbMap,
      cbFlatMap,
      filter: { filter, searchValue },
      searchKeys = [],
      totalElements
    } = props;
    data = data.flatMap(cbFlatMap).map(cbMap);
    if (searchValue && searchValue.trim().length !== 0) {
      data = data.filter(e => {
        let result = false;
        searchKeys.forEach(k => {
          if (
            e[k] &&
            searchValue &&
            e[k].toLowerCase().includes(searchValue.toLowerCase())
          ) {
            result = true;
          }
        });
        return result;
      });
    } else {
      for (let key in filter) {
        if ({}.hasOwnProperty.call(filter, key)) {
          const selectedFilter = filter[key];
          data = data.filter(d => {
            let result = false;
            if ({}.hasOwnProperty.call(d, key)) {
              if (typeof d[key] === 'string') {
                getArrayFromCsv(d[key]).forEach(item => {
                  if (selectedFilter instanceof Array) {
                    for (let i = 0; i < selectedFilter.length; i++) {
                      if (item.includes(selectedFilter[i])) {
                        result = true;
                        break;
                      }
                    }
                  } else {
                    result = item.includes(selectedFilter);
                  }
                });
              } else {
                result = selectedFilter.includes(d[key]);
              }
            } else {
              result = true;
            }
            return result;
          });
        }
      }
    }
    data = data.sort((a, b) => b.id - a.id);
    this.setState({ data });
    this.props.dispatch({
      type: FILTER_COUNT,
      payload: { filteredTotal: data.length, unfilteredTotal: totalElements }
    });
  }

  _onClick(action, index, event) {
    if (this.props.onClick) {
      const item = this.state.data[index];
      this.props.onClick(action, item.id, item, event);
    }
  }

  _onMore = () => {
    this.debouncedNextPage();
  };

  nextPage = () => {
    this.props.dispatch({ type: PAGE_CHANGE });
  }

  render() {
    let {
      resource,
      headers,
      scope,
      cellStyle,
      totalElements,
      emptyMessage,
    } = this.props;
    const { data } = this.state;
    let style = defaultCellStyle;
    if (cellStyle) {
      style = { ...style, ...cellStyle };
    }

    let tableHeaders = [];
    let keys = [];
    headers.forEach(h => {
      if (typeof h === 'string') {
        tableHeaders.push(h);
        keys.push(h);
      } else {
        const { label, tooltip, key, width } = h;
        tableHeaders.push({ label, tooltip, width });
        keys.push(key);
      }
    });

    let onMore;
    if (totalElements && data.length < totalElements) {
      onMore = this._onMore;
    }

    let contents;
    if (data.length == 0) {
      contents = <Box alignSelf='center'>{emptyMessage}</Box>;
    }
    if (data.length > 0) {
      const header = tableHeaders.map((h, i) => {
        let result;
        if (typeof h === 'string') {
          result = (
            <th key={i} style={{ ...style, fontWeight: 'bold' }}>
              {splitCamelCase(h)}
            </th>
          );
        } else {
          const tooltip = h.tooltip;
          if (tooltip != undefined) {
            result = (
              <THeadTooltip
                key={i}
                tooltipPosition='top'
                tooltip={tooltip}
                style={{ ...style, width: h.width, fontWeight: 'bold' }}
              >
                {' '}
                {h.label}
              </THeadTooltip>
            );
          } else {
            result = (
              <th
                key={i}
                style={{ ...style, width: h.width, fontWeight: 'bold' }}
              >
                {h.label}
              </th>
            );
          }
        }
        return result;
      });
      const scopes = typeof scope === 'function' ? scope() : scope;
      if (scopes && scopes.length > 0) {
        header.push(
          <th
            key={tableHeaders.length}
            style={{ ...style, fontWeight: 'bold', textAlign: 'center' }}
          >
            Action
          </th>
        );
      }

      const items = data.map((item, idx) => {
        let cells = keys.map((key, i) => {
          return (
            <TableCell key={i} style={style}>
              {typeof item[key] === 'undefined' ||
              (typeof item[key] === 'string' && item[key].length == 0)
                ? '-'
                : item[key]}
            </TableCell>
          );
        });
        const scopes = typeof scope === 'function' ? scope(item) : scope;
        if (scopes && scopes.length > 0) {
          let actions = [];
          scopes.forEach((e, i) => {
            let icon = e.icon, tooltip, action;
            if (typeof e === 'string') {
              action = e;
            } else {
              action = e.value;
              tooltip = e.tooltip;
            }
            if (action == 'read') {
              icon = <ViewIcon />;
            } else if (action == 'update') {
              icon = <EditIcon />;
            } else if (action == 'archive') {
              icon = <ArchiveIcon />;
            } else if (action == 'delete') {
              icon = <TrashIcon />;
            } else if (action == 'next') {
              icon = <LinkNextIcon />;
            } else if (action == 'run') {
              icon = <CirclePlayIcon />;
            } else if (action == 'download') {
              icon = <DownloadIcon />;
            }
            if (tooltip) {
              actions.push(
                <ButtonTooltip
                  tooltip={tooltip}
                  key={i}
                  icon={icon}
                  onClick={this._onClick.bind(this, action, idx)}
                />
              );
            } else {
              actions.push(
                <Button
                  key={i}
                  icon={icon}
                  onClick={this._onClick.bind(this, action, idx)}
                />
              );
            }
          });
          let width =
            actions.length == 1
              ? 100
              : actions.length == 2
              ? 150
              : actions.length == 3
              ? 200
              : 250;
          cells.push(
            <TableCell
              key={keys.length}
              style={{ ...style, textAlign: 'center', width }}
            >
              {actions}
            </TableCell>
          );
        }

        return <TableRow key={idx}>{cells}</TableRow>;
      });

      contents = (
        <GTable onMore={onMore}>
          <thead>
            <tr>{header}</tr>
          </thead>
          <tbody>{items}</tbody>
        </GTable>
      );
    }

    return (
      <Box
        full={this.props.full}
        colorIndex={this.props.colorIndex}
        size={this.props.width}
        pad={{ horizontal: 'medium' }}
        align='center'
      >
        {contents}
      </Box>
    );
  }
}

const headerType = PropTypes.oneOfType([PropTypes.string, PropTypes.object]);

Table.propTypes = {
  headers: PropTypes.arrayOf(headerType).isRequired,
  cbMap: PropTypes.func,
  cbFlatMap: PropTypes.func,
  totalElements: PropTypes.number.isRequired,
  scope: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  onClick: PropTypes.func,
  searchKeys: PropTypes.arrayOf(PropTypes.string),
  emptyMessage: PropTypes.string,

  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  full: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  colorIndex: PropTypes.string,
  cellStyle: PropTypes.object
};

Table.defaultProps = {
  width: 'auto',
  full: false,
  colorIndex: 'light-1',
  cbMap: e => e,
  cbFlatMap: e => [e],
  searchKeys: ['name'],
  emptyMessage: ''
};

const mapStateToProps = (state, props) => {
  let data = [], totalElements: 0;
  if (state[props.resource] && state[props.resource][`${props.resource}s`]) {
    data = denormalise(state[props.resource][`${props.resource}s`]);
    totalElements = state[props.resource].totalElements;
  }
  return { data, totalElements, filter: state.filter };
};

export default connect(mapStateToProps)(Table);

/*
header: array of object {key,value} or array of key string
[
  {key: string, label: string, tooltip: string, width: string} or key: string
]

data: array of objects
[
  {color: , ...other_data}
]
scope: array of string or object {value: , tooltip}
values can be [read,update,delete,archive,next,download]


searchKeys: array of Strings. It is used with PageHeader Component. When user types something in seacrh of pageHeader, 
Table receives that value via filterReducer and searches in the data available. 
So, It is required to mention which field to search for.

if scope is used, data must contain key id, as the value of id will be passed to onClick method
*/
