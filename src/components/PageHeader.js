import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {SEARCH} from '../actions/filterActions';

import AddIcon from 'grommet/components/icons/base/Add';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import FilterControl from 'grommet-addons/components/FilterControl';
import Header from 'grommet/components/Header';
import HelpIcon from 'grommet/components/icons/base/Help';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';

class PageHeader extends Component {

  constructor () {
    super();
    this._onSearch = this._onSearch.bind(this);
    this._onAdd = this._onAdd.bind(this);
    this._onFilter = this._onFilter.bind(this);
    this._onHelp = this._onHelp.bind(this);
  }

  _onSearch (event) {
    this.props.dispatch({type: SEARCH, payload: {searchValue: event.target.value}});
  }

  _onAdd () {
    const { history, match, pathAdd } = this.props;
    history.push(`${match.path}${pathAdd}`);
  }

  _onFilter () {
    if (this.props.onFilter) {
      this.props.onFilter();
    }
  }

  _onHelp () {
    if (this.props.onHelp) {
      this.props.onHelp();
    }
  }

  render() {
    const { 
      title,
      justify, 
      searchControl, 
      searchPlaceholder, 
      addControl, 
      pathAdd,
      filterControl,
      helpControl,
      match 
    } = this.props;

    const { filteredTotal, unfilteredTotal, searchValue } = this.props.filter;

    let searchItem, addItem, filterItem, helpItem;
    if (searchControl) {
      searchItem = (
        <Search inline={true} fill={true} size='medium' placeHolder={searchPlaceholder}
          value={searchValue} onDOMChange={this._onSearch} />
      );
    }
    if (addControl) {
      addItem = (<Button icon={<AddIcon />} onClick={this._onAdd}/>);
    }

    if (filterControl) {
      filterItem = (
        <FilterControl filteredTotal={filteredTotal}
          unfilteredTotal={unfilteredTotal}
          onClick={this._onFilter} />
      );
    }

    if (helpControl) {
      helpItem = (<Button icon={<HelpIcon />} onClick={this._onHelp}/>);
    }

    return (
      <Header id="page-header" justify={justify} fixed={false} size='large' pad={{ horizontal: 'medium' }}>
        <Title responsive={false}> <span>{title}</span> </Title>
        {searchItem}
        <Box direction='row'>
          {addItem}
          {filterItem}
          {helpItem}
        </Box>
      </Header>
    );
  }
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  justify: PropTypes.string,
  searchControl: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  addControl: PropTypes.bool,
  pathAdd: PropTypes.string,
  filterControl: PropTypes.bool,
  onFilter: PropTypes.func,
  filteredTotal: PropTypes.number,
  unfilteredTotal: PropTypes.number,
  helpControl: PropTypes.bool,
  onHelp: PropTypes.func
};

PageHeader.defaultProps = {
  justify: 'between',
  searchControl: false,
  searchPlaceholder: 'Search',
  addControl: false,
  pathAdd: 'add',
  filterControl: false,
  filteredTotal: 0,
  unfilteredTotal: 0,
  helpControl: false
};

const select = (store) => ({filter: store.filter});

export default withRouter(connect(select)(PageHeader));