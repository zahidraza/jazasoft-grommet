import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {FORM_CHANGE} from '../actions/formActions';

import Box from 'grommet/components/Box';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

/**
 * Multi Column Form
 */
class MCForm extends Component {

  constructor () {
    super();
  }

  _onChange (elementType, name, event) {
    let payload, value;
    if (elementType == 'input') {
      value = event.target.value
    } else if (elementType == 'select') {
      value = event.value;
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
          cellItem = (
            <Box key={j} basis={cell.basis} >

              <FormField label={cell.label} error={error[cell.name]} >
                <input type='text' 
                  placeholder={cell.placeholder}
                  name={cell.name} value={formData[cell.name] || cell.value || ''} 
                  onChange={this._onChange.bind(this, 'input', cell.name)} />
              </FormField>
                
            </Box>
          );
        } else if (cell.elementType === 'select') {
          cellItem = (
            <Box key={j} basis={cell.basis} >

              <FormField label={cell.label} error={error[cell.name]} >
                <Select options={cell.options} 
                  placeholder={cell.placeholder}
                  value={formData[cell.name] || cell.value || ''} 
                  onChange={this._onChange.bind(this, 'select', cell.name)} />
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
      elementType: input|select,
      label: String,
      name: parameter name,
      basis: '1/3',
      placeholder: String,
      options: if type is select,
      value: 
    }

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