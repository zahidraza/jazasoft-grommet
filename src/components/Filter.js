import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {splitCamelCase} from '../utils/utility';
import { FILTER_APPLY, FILTER_CLEAR, SORT_APPLY } from '../actions/filterActions';

import Button from 'grommet/components/Button';
import CloseIcon from 'grommet/components/icons/base/Close';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Layer from 'grommet/components/Layer';
import Section from 'grommet/components/Section';
import Select from 'grommet/components/Select';
import Sidebar from 'grommet/components/Sidebar';
import Sort from 'grommet-addons/components/Sort';
import ClearIcon from 'grommet/components/icons/base/ClearOption';


class Filter extends Component {

  constructor () {
    super();
    this._onClose = this._onClose.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onClear = this._onClear.bind(this);
    this._onChangeSort = this._onChangeSort.bind(this);
  }

  
  componentWillMount() {
    const { sortOptions, filter: { sort } } = this.props;
    if (!sort.value && sortOptions && sortOptions.length > 0) {
      this._onChangeSort({value: sortOptions[0].value, direction: sortOptions[0].direction});
    }
  }
  

  _onClose () {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  _onClear () {
    this.props.dispatch({ type: FILTER_CLEAR });
  }

  _onChange (name,event) {
    let filter = this.props.filter.filter;
    if (!event.option.value || event.option.value == 'All') {
      // user selected the 'All' option, which has no value, clear filter
      delete filter[name];
    } else {
      // we get the new option passed back as an object,
      // normalize it to just a value
      let selectedFilter = event.value.map(value => (
        typeof value === 'object' ? value.value : value)
      );
      selectedFilter = selectedFilter.filter(v => v != 'All');
      filter[name] = selectedFilter;
      if (filter[name].length === 0) {
        delete filter[name];
      }
    }
    this.props.dispatch({type:FILTER_APPLY, payload: { filter }});
  }

  _onChangeSort (sort) {
    this.props.dispatch({type: SORT_APPLY, payload: {sort}});
  }

  render() {
    const { active, filterItems, sortOptions, filter: { filter, sort } } = this.props;
    let onClose;

    let filterContent;
    if (filterItems) {
      filterContent = filterItems.map((item, idx) => {
        let elements = item.elements;
        elements = elements.map(e => {
          if (typeof e === 'string' || e instanceof String) {
            return { label: e, value: e};
          }
          if (e instanceof Object) {
            return e;
          }
        });
        if (item.inline != undefined && !item.inline) {
          elements.unshift({label: 'All', value: 'All'});
        } else {
          elements.unshift({label: 'All', value: undefined});
        }
        let value = filter[item.key];
        if (value == undefined && item.inline != undefined && !item.inline) {
          value = 'All';
        }

        return (
          <Section key={idx} pad={{ horizontal: 'large', vertical: 'small' }}>
            <Heading tag='h3'>{item.label}</Heading>
            <Select 
              inline={item.inline != undefined ? item.inline : true}  
              multiple={true} 
              options={elements} 
              value={value} 
              onChange={this._onChange.bind(this,item.key)} />
          </Section>
        );
      });
    }

    let sortContent;
    if (sortOptions && sortOptions.length != 0) {
      let value = sort.value, direction = sort.direction;
      if (!value) {
        value = sortOptions[0].value;
        direction = sortOptions[0].direction;
      }
      sortContent = (
        <Section pad={{ horizontal: 'large', vertical: 'small' }}>
          <Heading tag='h2'>Sort</Heading>
          <Sort options={sortOptions} value={value} direction={direction}
          onChange={this._onChangeSort} />
        </Section>
      );
    }

    return (
      <Layer hidden={!active} align='right' flush={true} closer={true} onClose={this._onClose}>
        <Sidebar size='large'>
            <Header size='large' justify='between' align='center'
              pad={{ horizontal: 'medium'}}
              margin={{vertical: 'medium'}}
              >
              <Heading tag='h2' >Filter</Heading>
              <Button icon={<ClearIcon />} label='Clear All' plain={true}
                onClick={this._onClear} />
            </Header> 
            
            {filterContent}

            {sortContent}
            
        </Sidebar>
      </Layer>
    );
  }
}

Filter.propTypes = {
  active: PropTypes.bool.isRequired,
  filterItems: PropTypes.array,
  sortOptions: PropTypes.array
};

Filter.defaultProps = {
  filterItems: []
};

const select = (store) => ({filter: store.filter});

export default connect(select)(Filter);

/*
  active: whether filter s active or not. when active filter ui in right side will be displayed
  filterItems: array of Object
  {
    label: string,
    key: string,     //Filter Key. Data being filtered must have this key in the object
    inline: deafault true
    elements: array of string or object
  } 
  sortOptions: array of object {label: , value: , direction: , type: }
 */

