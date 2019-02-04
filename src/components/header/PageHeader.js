import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import {SEARCH} from '../../actions/filterActions';

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
import DownloadIcon from 'grommet/components/icons/base/Download';
import UploadIcon from 'grommet/components/icons/base/Upload';
import CirclePlayIcon from 'grommet/components/icons/base/CirclePlay';
import TooltipButton from '../TooltipButton';

class PageHeader extends Component {

  constructor () {
    super();
    this.state = {
      searchValue: ''
    };
    this.debouncedOnSearch = debounce(this._onSearch.bind(this), 500);
  }

  _onClick = (type, idx, path) => (event) => {
    if (type == 'search') {
      const searchValue = event.target.value;
      this.setState({searchValue});
      this.debouncedOnSearch(searchValue);
    }
    if (path) {
      const { history, match } = this.props;
      history.push(`${path}`);
    }

    if (this.props.onClick) {
      this.props.onClick(idx, type, event);
    }
  };

  _onSearch = (searchValue) => {
    this.props.dispatch({type: SEARCH, payload: {searchValue}});
  };

  render() {
    let { 
      title,
      controls,
      justify, 
      loading,
      match 
    } = this.props;

    let searchItem, controlItems = [];
    controls.forEach((control, idx) => {
      let item;
      if (control.type == 'search') {
        searchItem = (
          <Search key={idx} inline={true} fill={true} size='medium' placeHolder={control.placeholder || 'Seacrh'}
            value={this.state.searchValue} onDOMChange={this._onClick('search', idx, undefined)} />
        );
      } else if (control.type == 'filter') {
        item = (
          <FilterControl key={idx} filteredTotal={control.filteredTotal || this.props.filter.filteredTotal}
            unfilteredTotal={control.unfilteredTotal || this.props.filter.unfilteredTotal}
            onClick={this._onClick('filter', idx, control.path)} />
        );
      } else if (control.type == 'add') {
        item = (<TooltipButton key={idx} tooltip={control.tooltip || 'Add'} icon={<AddIcon />} onClick={this._onClick('add', idx, control.path)}/>);
      } else if (control.type == 'help') {
        item = (<TooltipButton key={idx} tooltip={control.tooltip || 'Help'} icon={<HelpIcon />} onClick={this._onClick('help', idx, control.path)}/>);
      } else if (control.type == 'refresh') {
        item = (<TooltipButton key={idx} tooltip={control.tooltip || 'Refresh Page'} icon={<SyncIcon />} onClick={this._onClick('refresh', idx, control.path)}/>);
      } else if (control.type == 'upload') {
        item = (<TooltipButton key={idx} tooltip={control.tooltip || 'Upload'} icon={<UploadIcon />} onClick={this._onClick('refresh', idx, control.path)}/>);
      } else if (control.type == 'download') {
        item = (<TooltipButton key={idx} tooltip={control.tooltip || 'Download'} icon={<DownloadIcon />} onClick={this._onClick('refresh', idx, control.path)}/>);
      } else if (control.type == 'run') {
        if (control.tooltip) {
          item = (<TooltipButton key={idx} tooltip={control.tooltip} icon={<CirclePlayIcon />} onClick={this._onClick('custom', idx, control.path)}/>);
        } else {
          item = (<Button key={idx} icon={<CirclePlayIcon />} onClick={this._onClick('custom', idx, control.path)}/>);
        }
      } else if (control.type == 'custom') {
        if (control.tooltip) {
          item = (<TooltipButton key={idx} tooltip={control.tooltip} icon={control.icon} onClick={this._onClick('custom', idx, control.path)}/>);
        } else {
          item = (<Button key={idx} icon={control.icon} onClick={this._onClick('custom', idx, control.path)}/>);
        }
      }
      if (item) {
        controlItems.push(item);
      }
    });

    // if (loading) {
    //   loadingItem = (<Box size='xsmall' align='end' alignSelf='center'><Spinning /></Box>);
    // }

    return (
      <Header justify={justify} pad={{ horizontal: 'medium' }} >
        <Title><Heading id="pageTitle" tag='h3' strong={true}> {title}</Heading></Title>
        {searchItem}
        <Box direction='row'>
          {controlItems}
        </Box>
      </Header>
    );
  }
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  controls: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['search','add','filter','help','refresh','upload','download','run','custom']).isRequired, 
    placeholder: PropTypes.string,
    path: PropTypes.string,
    filteredTotal: PropTypes.number,
    unfilteredTotal: PropTypes.number,
    icon: PropTypes.node,
    tooltip: PropTypes.string
  })),
  justify: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func
};

PageHeader.defaultProps = {
  justify: 'between',
  controls: [],
  loading: false
};

const select = (store) => ({filter: store.filter});

export default withRouter(connect(select)(PageHeader));