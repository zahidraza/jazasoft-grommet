import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

import {splitCamelCase} from '../utils/utility';
import { FILTER_APPLY, FILTER_CLEAR, SORT_APPLY, RANGE_CHANGE } from '../actions/filterActions';

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
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import DateTime from 'grommet/components/DateTime';


class Filter extends Component {

  constructor () {
    super();
    this._onClose = this._onClose.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onClear = this._onClear.bind(this);
    this._onRangeChange = this._onRangeChange.bind(this);
    this._onChangeSort = this._onChangeSort.bind(this);
  }

  
  componentWillMount() {
    const { sortOptions, filterItems, rangeItems, filter: { sort } } = this.props;
    if (!sort.value && sortOptions && sortOptions.length > 0) {
      this._onChangeSort({value: sortOptions[0].value, direction: sortOptions[0].direction});
    }
    let filter = {};
    filterItems.forEach(e => {
      const selectedFilter = e.elements.filter(e => e.selected && e.selected == true).map(e => e.value);
      if (selectedFilter.length != 0) {
        filter[e.key] = selectedFilter;
      }
    });
    if (Object.keys(filter).length != 0) {
      this.props.dispatch({type:FILTER_APPLY, payload: { filter }});
    }
    let range = {};
    if (rangeItems) {
      rangeItems.forEach(e => {
        if (e.start || e.end) {
          range[e.key] = {start: e.start, end: e.end};
        }
      });
    }
    if (Object.keys(range).length > 0) {
      this.props.dispatch({type: RANGE_CHANGE, payload: {range}});
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

  /**
   * 
   * @param {*} elementType type of element. e.g- date
   * @param {*} key Object key
   * @param {*} type start|end
   * @param {*} event event generated. if input type is DateTime, event = value of date
   * @return {*} void
   */
  _onRangeChange (elementType, key, type, event) {
    let range = this.props.filter.range;
    if (elementType == 'date') {
      if (range[key]) {
        range[key][type] = new Date(event);
      } else {
        range[key] = {[type]: new Date(event)};
      }
    }
    this.props.dispatch({type: RANGE_CHANGE, payload: {range}});
  }

  _onChange (name,event) {
    let filter = cloneDeep(this.props.filter.filter);
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
    const { active, filterItems, rangeItems, sortOptions, filter: { filter, range, sort } } = this.props;

    let rangeContent;
    if (rangeItems) {
      rangeContent = rangeItems.map((item, idx) => {
        if (item.type == 'date') {
          return (  
            <Section key={idx} pad={{horizontal: 'medium', vertical: 'small'}}>
              <Heading tag='h3'>{item.label}</Heading>
              <Form>
                <FormFields>
                  <FormField label='from'>
                    <DateTime
                      format='MM/DD/YYYY'
                      value={(range[item.key] && range[item.key].start) ||  item.start}
                      onChange={this._onRangeChange.bind(this, 'date', item.key, 'start')} />
                  </FormField>
                  <FormField label="to">
                    <DateTime 
                      format='MM/DD/YYYY'
                      value={(range[item.key] && range[item.key].end) || item.end}
                      onChange={this._onRangeChange.bind(this, 'date', item.key, 'end')} />
                  </FormField>
                </FormFields>
              </Form>
            </Section>
          );
        }
      });
    }

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
        if (item.sort && item.sort == true) {
          elements = elements.sort((a, b) => a.label < b.label ? -1 : 1);
        }
        if (item.inline != undefined && !item.inline) {
          elements.unshift({label: 'All', value: 'All'});
        } else {
          elements.unshift({label: 'All', value: undefined});
        }

        let value = filter[item.key];
        if (value == undefined && item.inline != undefined && !item.inline) {
          if (typeof item.elements[0] === 'string') {
            value = 'All';
          } else {
            value = {label: 'All', value: undefined};
          }
        }
        return (
          <Section key={idx} pad={{ horizontal: 'medium', vertical: 'small' }}>
            <Heading tag='h3'>{item.label}</Heading>
            <Select key={idx} id={'s-'+idx}
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
        <Section pad={{ horizontal: 'medium', vertical: 'small' }}>
          <Heading tag='h3'>Sort</Heading>
          <Sort options={sortOptions} value={value} direction={direction}
          onChange={this._onChangeSort} />
        </Section>
      );
    }

    return (
      <Layer hidden={!active} align='right' flush={true} closer={true} onClose={this._onClose}>
        <Sidebar size='large'>
          <div>
            <Header size='large' justify='between' align='center'
              pad={{ horizontal: 'medium'}}
              margin={{vertical: 'medium'}}
              >
              <Heading tag='h2' >Filter</Heading>
              <Button icon={<ClearIcon />} label='Clear All' plain={true}
                onClick={this._onClear} />
            </Header> 
            {rangeContent}

            {sortContent}

            {filterContent}

          </div>
        </Sidebar>
      </Layer>
    );
  }
}

Filter.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  filterItems: PropTypes.arrayOf(PropTypes.object),
  rangeItems: PropTypes.arrayOf(PropTypes.object),
  sortOptions: PropTypes.arrayOf(PropTypes.object)
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
    selected: bool
  } 
  rangeItems: array of objects
  {
    type: date,
    label: string,
    key: string,
  }

  sortOptions: array of object {label: , value: , direction: , type: }

 */

