import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {FORM_CHANGE} from '../actions/formActions';

import Box from 'grommet/components/Box';
import FormField from 'grommet/components/FormField';
import RadioButton from 'grommet/components/RadioButton';
import Select from 'grommet/components/Select';
import CheckBox from 'grommet/components/CheckBox';

/**
 * Multi Column Form
 */
class MCForm extends Component {

  constructor () {
    super();
  }

  componentWillMount() {
    const {data} = this.props;
    let formData = {};
    data.forEach((row) => {
      row.forEach((cell) => {
        if (cell.elementType == 'radio-button' && cell.options) {
          const item = cell.options.filter(e => e.checked == true);
          if (item.length > 0) {
            formData[cell.name] = item[0].label;
          }
        } else {
          formData[cell.name] = cell.value;
        }
      });
    });
    this.props.dispatch({type: FORM_CHANGE, payload: {name: this.props.name, data: formData}});
  }
  
  _onChange (elementType, name, event) {
    let payload, value;
    if (elementType == 'input') {
      value = event.target.value
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
        } else if (cell.elementType === 'select') {
          e.options.unshift({label: 'No Value', value: undefined});
          cellItem = (
            <Box key={j} basis={cell.basis} >

              <FormField label={cell.label} error={error[cell.name]} >
                <Select options={cell.options} 
                  placeholder={cell.placeholder}
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
                  toggle={true} 
                  onChange={this._onChange.bind(this, 'checkbox', cell.name)}/>
              </FormField>
            </Box>
          );
        } else if (cell.elementType === 'radio-button') {
          const radioItems = cell.options.map((e, i) => {
            return (
              <RadioButton id={cell.name + i} key={i}
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