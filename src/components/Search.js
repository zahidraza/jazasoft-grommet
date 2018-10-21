import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {FORM_CHANGE} from '../actions/formActions';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Select from 'grommet/components/Select';
import DateTime from 'grommet/components/DateTime';
import FormField from 'grommet/components/FormField';
import Title from 'grommet/components/Title';
import FilterIcon from 'grommet/components/icons/base/Filter';

class Search extends Component {

  constructor () {
    super();
    this._onChange = this._onChange.bind(this);
    this._onSearch = this._onSearch.bind(this);

    this.state = {
      filteredOptions: {}
    };
  }

  componentWillMount() {
    const {data} = this.props;
    if (data && data.length > 0) {
      let filteredOptions = {};
      data.forEach((e) => {
        filteredOptions[e.name] = e.options
      });
      this.setState({filteredOptions});
      this.props.dispatch({type: FORM_CHANGE, payload: {data:  data.reduce((acc, el) => ({...acc, [el.name]: el.value}), {})}});
    }
  }
  

  _onChange (type, key, event) {
    let value;
    if (type == 'select') {
      value = event.value;
    } else if (type == 'date') {
      value = new Date(event);
    }

    this.props.dispatch({type: FORM_CHANGE, payload: {key, value}});
    if (this.props.onChange) {
      this.props.onChange(type, key, event.value);
    }
  }

  _onSearch (key, options, event) {
    let {filteredOptions} = this.state;
    const value = event.target.value;
    filteredOptions[key] = options.filter(e => {
      let result;
      if (typeof e === 'string') {
        result = e.toLowerCase().includes(value.toLowerCase());
      } else if (typeof e === 'object') {
        result = e.label.toLowerCase().includes(value.toLowerCase());
      }
      return result;
    });
    this.setState({filteredOptions});
  }

  render() {
    const {filteredOptions} = this.state;
    const {title, data, form: {formData}, dispatch, filter, onFilter, ...restProps} = this.props;


    const titleItem = title && (
      <Box alignSelf='center'> 
        <Title><Heading tag='h3'> {title}</Heading></Title>
      </Box>
    );

    let content;
    if (data && data.length > 0) {
      content = data.map((e, i) => {
        let result;
        const size = e.width || 'medium';
        if (e.type == 'select') {
          let options = filteredOptions[e.name];
          if (options.length > 0 && ((typeof options[0] == 'object' && options[0].value != undefined) || (typeof options[0] == 'string' && options[0] != 'No Value'))) {
            options.unshift({label: 'No Value', value: undefined});
          }
          result = (
            <Box key={i} size={size}>
              <Select options={options} 
                placeHolder={e.placeholder}
                value={formData[e.name] || e.value || ''} 
                onChange={this._onChange.bind(this, e.type, e.name)}
                onSearch={this._onSearch.bind(this, e.name, e.options)} />
            </Box>
          );
        } else if (e.type == 'date') {
          result = (
            <Box key={i} direction='row' pad={{between: 'small', horizontal: 'small'}} >
              <Box alignSelf='center' alignContent='center'>
                <Title><Heading tag='h4'> {e.placeholder}</Heading></Title>
              </Box>
              <Box alignSelf='center'>
                <FormField>
                  <DateTime format='MM/DD/YYYY' 
                    value={formData[e.name] || e.value || ''} 
                    onChange={this._onChange.bind(this, e.type, e.name)}/>
                </FormField>
              </Box>
              
            </Box>
          );
        }
        return result;
      });
    }

    return (
      <Header justify='between' pad={{horizontal: 'medium'}}  {...restProps}>
        {titleItem}
        <Box direction='row'  >
          {content}
          {filter && (
            <Box alignSelf="center"> <FilterIcon onClick={onFilter} /> </Box>
          )}
        </Box>
      </Header>
    );
  }
}

Search.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,  //Key with which data will store in formReducer
    type: PropTypes.oneOf(['select','date']).isRequired,
    width: PropTypes.oneOf(['small','medium','large','xlarge','full']),
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      })
    ]))
  })),
  filter: PropTypes.bool,
  onFilter: PropTypes.func,
  onChange: PropTypes.func,
  ...Box.propTypes
};

Search.defaultProps = {
  size: 'large',
  filter: false
};

const select = (store) => ({form: store.form});

export default connect(select)(Search);


