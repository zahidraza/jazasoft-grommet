import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {FORM_CHANGE} from '../actions/formActions';

import Box from 'grommet/components/Box';
import FormField from 'grommet/components/FormField';
import RadioButton from 'grommet/components/RadioButton';
import Select from 'grommet/components/Select';
import CheckBox from 'grommet/components/CheckBox';
import TextInput from 'grommet/components/TextInput';

/**
 * Multi Column Form
 */
class MCForm extends Component {

  constructor () {
    super();
    this._onChange = this._onChange.bind(this);
    this._onSuggestionSelect = this._onSuggestionSelect.bind(this);
    this.state = {
      suggestions: {},
      filteredSuggestions: {}
    }
  }

  componentWillMount() {
    const {data} = this.props;
    let formData = {}, suggestions = {};
    data.forEach((row) => {
      row.forEach((cell) => {
        if (cell.elementType == 'radio-button' && cell.options) {
          const item = cell.options.filter(e => e.checked == true);
          if (item.length > 0) {
            formData[cell.name] = item[0].label;
          }
        } else if (cell.elementType == 'text-input') {
          formData[cell.name] = cell.value;
          suggestions[cell.name] = cell.suggestions;
        } else {
          formData[cell.name] = cell.value;
        }
      });
    });
    this.setState({suggestions, filteredSuggestions: {...suggestions}});
    this.props.dispatch({type: FORM_CHANGE, payload: {name: this.props.name, data: formData}});
  }
  
  _onChange (elementType, name, event) {
    let payload, value;
    if (elementType == 'input') {
      value = event.target.value
    } else if (elementType == 'text-input') {
      let {suggestions, filteredSuggestions} = this.state;
      value = event.target.value;
      let suggestion = suggestions[name];

      if (suggestion) {
        filteredSuggestions[name] = suggestion.filter(e => e.toLowerCase().includes(value.toLowerCase()));
        this.setState({filteredSuggestions});
      }
    } else if (elementType == 'select') {
      value = event.value;
    } else if (elementType == 'radio-button') {
      //here event contains value selected
      value = event;
    } else if (elementType == 'checkbox') {
      value = event.target.checked;
    }

    if (this.props.name) {
      payload = { name: this.props.name, key: name, value}
    } else {
      payload = { key: name, value}
    }
    this.props.dispatch({type: FORM_CHANGE, payload});
  }

  _onSuggestionSelect (name, event) {
    const value = event.suggestion;
    let payload;
    if (this.props.name) {
      payload = { name: this.props.name, key: name, value}
    } else {
      payload = { key: name, value}
    }
    this.props.dispatch({type: FORM_CHANGE, payload});
  }

  render() {
    const {data, name, form: {formData: fData}, err: {error}} = this.props;

    let formData = fData;
    if (name) {
      formData = fData[name] || {};
    }

    const content = data.map((row,i) => {
      let rowItem = row.map((cell, j) => {
        let cellItem;
        if (cell.elementType === 'input') {
          const value = (formData[cell.name] != undefined) ? formData[cell.name] : (cell.value != undefined ? cell.value : '');
          cellItem = (
            <Box key={j} basis={cell.basis} >
              <FormField label={cell.label} error={error[cell.name]} >
                <input type='text' 
                  placeholder={cell.placeholder}
                  disabled={cell.disabled || false}
                  name={cell.name} 
                  value={value} 
                  onChange={this._onChange.bind(this, 'input', cell.name)} />
              </FormField>
                
            </Box>
          );
        } else if (cell.elementType === 'text-input') {
          const value = (formData[cell.name] != undefined) ? formData[cell.name] : (cell.value != undefined ? cell.value : '');
          cellItem = (
            <Box key={j} basis={cell.basis} >
              <FormField label={cell.label} error={error[cell.name]} >
                <TextInput
                  placeholder={cell.placeholder}
                  disabled={cell.disabled || false}
                  name={cell.name} 
                  value={value} 
                  onDOMChange={this._onChange.bind(this, 'text-input', cell.name)}
                  onSelect={this._onSuggestionSelect.bind(this, cell.name)}
                  suggestions={this.state.filteredSuggestions[cell.name] || []}
                  />
              </FormField>
                
            </Box>
          );
        } else if (cell.elementType === 'select') {
          let options = [...cell.options];
          options.unshift({label: 'No Value', value: undefined});
          if (cell.disabled && cell.disabled == true) {
            options = [];
          }
          cellItem = (
            <Box key={j} basis={cell.basis} >
              <FormField label={cell.label} error={error[cell.name]} >
                <Select options={options} 
                  placeHolder={cell.placeholder}
                  disabled={cell.disabled || false}
                  value={formData[cell.name] || cell.value || ''} 
                  onChange={this._onChange.bind(this, 'select', cell.name)} />
              </FormField>               
            </Box>
          );
        } else if (cell.elementType == 'checkbox') {
          cellItem = (
            <Box key={j} basis={cell.basis} >
              <FormField label={cell.label} >
                <CheckBox 
                  checked={formData[cell.name] == undefined ? false : formData[cell.name]} 
                  toggle={cell.toggle} 
                  disabled={cell.disabled || false}
                  onChange={this._onChange.bind(this, 'checkbox', cell.name)}/>
              </FormField>
            </Box>
          );
        } else if (cell.elementType === 'radio-button') {
          const radioItems = cell.options.map((e, i) => {
            return (
              <RadioButton id={cell.name + i} key={i}
                disabled={cell.disabled || false}
                name={cell.name + i}
                label={e.label}
                checked={formData[cell.name] == e.label}
                onChange={this._onChange.bind(this, 'radio-button', cell.name, e.label)} />
            );
          });
          cellItem = (
            <Box key={j} basis={cell.basis} >
              <FormField>
                {radioItems}
              </FormField>
            </Box>
          );
        }
        return cellItem;
      });

      return (
        <Box key={i} direction='row' pad={{between: 'small', vertical: 'small'}}>
          {rowItem}
        </Box>
      );

    });

    return (
      <Box margin='medium'>
        {content}
      </Box>
    );
  }
}

MCForm.propTypes = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.array)
};

MCForm.defaultProps = {
  data: [[]]
};

const select = (store) => ({form: store.form, err: store.err});

export default connect(select)(MCForm);

/*
name: Parameter name with which data should be sent Form Reducer
data: array of array of 
    {
      elementType: input|select|radio-button,
      label: String,
      name: parameter name,
      basis: '1/3',
      placeholder: String,
      options: if type is select,
      value: 
      disabled: bool
    }
for radio-button: 
options: [{label: string , checked: boolean}]

e.g
 const data = [
      [
        {
          elementType: 'input',
          label: 'Name*',
          name: 'name',
          basis: '1/3',
          error: ''
        },
        {
          elementType: 'input',
          label: 'Address',
          name: 'address',
          basis: '2/3'
        }
      ],
      [
        {
          elementType: 'input',
          label: 'Contact Person',
          name: 'contactPerson',
          basis: '1/3'
        },
        {
          elementType: 'input',
          label: 'Email',
          name: 'email',
          basis: '1/3'
        },
        {
          elementType: 'input',
          label: 'Mobile',
          name: 'mobile',
          basis: '1/3'
        },
      ]
    ];
 */