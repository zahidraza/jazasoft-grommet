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
import Heading from 'grommet/components/Heading';
import HelpIcon from 'grommet/components/icons/base/Help';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';
import Spinning from 'grommet/components/icons/Spinning';
import SyncIcon from 'grommet/components/icons/base/Sync';
import TooltipButton from './TooltipButton';

class PageHeader extends Component {

  constructor () {
    super();
  }

  _onSearch = (event) => {
    this.props.dispatch({type: SEARCH, payload: {searchValue: event.target.value}});
  }

  _onAdd = () => {
    const { history, match, pathAdd } = this.props;
    history.push(`${match.path}${pathAdd}`);
  }

  _onFilter = () => {
    if (this.props.onFilter) {
      this.props.onFilter();
    }
  }

  _onHelp = () => {
    if (this.props.onHelp) {
      this.props.onHelp();
    }
  }

  _onRefresh = () => {
    if (this.props.onRefresh) {
      this.props.onRefresh();
    }
  }

  render() {
    let { 
      title,
      justify, 
      searchControl, 
      searchPlaceholder, 
      addControl, 
      pathAdd,
      filterControl,
      filteredTotal,
      unfilteredTotal,
      helpControl,
      loading,
      refreshControl,
      match 
    } = this.props;

    if (!filteredTotal) {
      filteredTotal = this.props.filter.filteredTotal
    }
    if (!unfilteredTotal) {
      unfilteredTotal = this.props.filter.unfilteredTotal
    }

    let searchItem, addItem, filterItem, helpItem, refreshItem, loadingItem;
    if (searchControl) {
      searchItem = (
        <Search inline={true} fill={true} size='medium' placeHolder={searchPlaceholder}
          value={this.props.searchValue} onDOMChange={this._onSearch} />
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

    if (refreshControl) {
      refreshItem = (<TooltipButton tooltip='Refresh Page' icon={<SyncIcon />} onClick={this._onHelp} onClick={this._onRefresh}/>);
    }

    if (loading) {
      loadingItem = (<Box size='xsmall' align='end' alignSelf='center'><Spinning /></Box>);
    }

    return (
      <Header justify={justify} pad={{ horizontal: 'medium' }} >
        <Title><Heading tag='h3' strong={true}> {title}</Heading></Title>
        {searchItem}
        <Box direction='row'>
          {addItem}
          {filterItem}
          {helpItem}
          {refreshItem}
          {loadingItem}
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
  onHelp: PropTypes.func,
  loading: PropTypes.bool,
  refreshControl: PropTypes.bool,
  onRefresh: PropTypes.func
};

PageHeader.defaultProps = {
  justify: 'between',
  searchControl: false,
  searchPlaceholder: 'Search',
  addControl: false,
  pathAdd: 'add',
  filterControl: false,
  helpControl: false,
  loading: false,
  refreshControl: false
};

const select = (store) => ({filter: store.filter});

export default withRouter(connect(select)(PageHeader));