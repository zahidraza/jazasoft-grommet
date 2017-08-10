import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {FORM_CHANGE} from '../actions/formActions';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import FormHeader from './FormHeader';
import Heading from 'grommet/components/Heading';
import Select from 'grommet/components/Select';

class GForm extends Component {

  constructor () {
    super();
    this._onSubmit = this._onSubmit.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }

  componentWillMount() {
    const {data} = this.props;
    let formData = {};
    data.forEach(fieldset => {
      fieldset.elements.forEach(element => {
        if (element.elementType == 'checkbox') {
          formData[element.name] = (element.defaultValue == undefined) ? false : element.defaultValue;
        }
      })
    })
    if (Object.keys(formData).length != 0) {
      this.props.dispatch({type: FORM_CHANGE, payload: {...formData}});
    }
  }
  
  _onSubmit () {
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }

  _onCancel () {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  _onToggleChange (name, event) {
    this.props.dispatch({type: FORM_CHANGE, payload: {[name]: event.target.checked}});
  }

  _onSelectChange (name, event) {
    this.props.dispatch({type: FORM_CHANGE, payload: {[name]: event.value}});
  }

  _onInputChange (name, event) {
    this.props.dispatch({type: FORM_CHANGE, payload: {[name]: event.target.value}});
  }

  render() {
    const {title, busy, data, submitControl, form: {formData, toggleForm}, err: { error, show}} = this.props;

    let submit, cancel;
    if (!busy) {
      submit = this._onSubmit;
      cancel = this._onCancel;
    }

    const fieldsets = data.map((fieldset, idx) => {
      let title;
      if (fieldset.title != undefined) {
        title = (
          <Box direction="row" justify="between">
            <Heading tag="h3">{fieldset.title}</Heading>
          </Box>
        );
      }

      const elements = fieldset.elements.map((e, i) => {
        let element;
        if (e.elementType == 'input') {
          const type = (e.type != undefined) ? e.type : 'text';
          element = (
            <FormField key={i} label={e.label} error={error[e.name]}>
              <input type={type} name={e.name} value={formData[e.name] == undefined ? '' : formData[e.name]} onChange={this._onInputChange.bind(this, e.name)} />
            </FormField>
          );
        }
        if (e.elementType == 'select') {
          const type = (e.type != undefined) ? e.type : 'text';
          const value = (formData[e.name] != undefined) ? formData[e.name] : e.placeholder;
          element = (
            <FormField key={i} label={e.label}>
              <Select options={e.options} 
                value={value} onChange={this._onSelectChange.bind(this, e.name)} />
            </FormField>
          );
        }
        if (e.elementType == 'checkbox') {
          element = (
            <FormField key={i}>
              <CheckBox label={e.label} checked={formData[e.name] == undefined ? false : formData[e.name]} toggle={true} onChange={this._onToggleChange.bind(this, e.name)}/>
            </FormField>
          );
        }
        return element;
      })
      

      return (
        <fieldset key={idx}>
          {title}
          {elements}
        </fieldset>
      );
    })

    let footer;
    if (submitControl) {
      footer = (
        <Footer pad={{'vertical': 'medium'}} justify='between' >
          <Button label='Add' primary={true} onClick={submit} />
          <Button label='Cancel'  onClick={cancel} />
        </Footer>
      );
    }

    const content = (
      <Form >
        <FormHeader title={title} busy={busy} /> 
        <FormFields>
          {fieldsets}
        </FormFields>
        {footer}
      </Form>
    );

    return (
      <Box alignSelf='center'>
          {content}
      </Box>
    );
  }
}

GForm.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string.isRequired,
  busy: PropTypes.bool,
  submitControl: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

GForm.defaultProps = {
  busy: false,
  submitControl: false
};

const select = (store) => {
  return {form: store.form, err: store.err};
};

export default connect(select)(GForm);

/*
  data: array of object
  [
      {
        title: optional String
        elements: [
          {
            elementType: input|select|checkbox,             required  - all 
            type: text|email|password   in case of input    optional  - input
            label: string,                                  required  - all
            name: string,                                   required  - all
            defaultValue: string|boolean                    optional  - all
            placeholder: string optional                    optional  - input
            options: arrayOf(string) - if type is select    optional  - select
            action: func 
          }
        ]
      }
    ]
  
*/