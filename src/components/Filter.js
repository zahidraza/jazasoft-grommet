import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {splitCamelCase} from '../utils/utility';
import { FILTER_APPLY, FILTER_CLEAR } from '../actions/filterActions';

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

  render() {
    const { active, filterItems, filter: { filter } } = this.props;
    let onClose;

    const items = filterItems.map((item, idx) => {
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
            
            {items}
            
        </Sidebar>
      </Layer>
    );
  }
}

Filter.propTypes = {
  active: PropTypes.bool.isRequired,
  filterItems: PropTypes.array
};

Filter.defaultProps = {
  filterItems: []
};

const select = (store) => ({filter: store.filter});

export default connect(select)(Filter);

/*
 {
   label: string,
   key: string,     //Filter Key. Data being filtered must have this key in the object
   inline: deafault true
   elements: array of string or object
 } 
 */

