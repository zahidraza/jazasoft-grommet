import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {FORM_CHANGE} from '../actions/formActions';

import AddIcon from 'grommet/components/icons/base/Add';
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
import Table from './DTable';
import Dialog from './Dailog';

class GForm extends Component {

  constructor () {
    super();

    this._onRemove = this._onRemove.bind(this);
    this._toggleDailog = this._toggleDailog.bind(this);
    this._submitDailog = this._submitDailog.bind(this);
    this._onDailogSelectChange = this._onDailogSelectChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onSelectChange = this._onSelectChange.bind(this);
    this._onToggleChange = this._onToggleChange.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onDInputChange = this._onDInputChange.bind(this);
    this._onDToggleChange = this._onDToggleChange.bind(this);

    this.state = {
      dialogActive: false,
      collection: {
        value: '',
        items: [],
        selectedItems: []
      },
      elements: [],
      dtElements: []
    };
  }

  /*
    When Component mounts: 
    1. check if any form element is of type checkbox, if so initialize the value and send action
    2. If collectionItems are there, initialize state with items and value
  */
  componentWillMount() {
    let {data, collectionItems, elements, dialogPlaceholder} = this.props;
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

    if (collectionItems != undefined) {
      let {collection} = this.state;
      collection.items = collectionItems.map(c => (typeof c === 'string') ? c : c.name);
      elements = elements.map(e => {
        if (e.type == 'input') {
          e.action = this._onDInputChange;
        }
        if (e.type == 'checkbox') {
          e.action = this._onDToggleChange;
        }
        return e;
      });
      collection.value = dialogPlaceholder;
      this.setState({collection, elements});
    }    
  }

  /*
    call parent on submit
  */
  _onSubmit () {
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }

  /*
    call parent on cancel
  */
  _onCancel () {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  /*
    start basic form related actions
  */
  _onToggleChange (name, event) {
    this.props.dispatch({type: FORM_CHANGE, payload: {[name]: event.target.checked}});
  }

  _onSelectChange (name, event) {
    this.props.dispatch({type: FORM_CHANGE, payload: {[name]: event.value}});
  }

  _onInputChange (name, event) {
    this.props.dispatch({type: FORM_CHANGE, payload: {[name]: event.target.value}});
  }
  /*
    end basic form related actions
  */

  /*
    start collection form related actions
  */
  _onDInputChange (index, name, event) {
    let {dtElements} = this.state;
    dtElements[index].data.forEach(e => {
      if (e.name == name) {
        e.value = event.target.value;
      }
    })
    this.setState({dtElements});
    this.props.dispatch({type: FORM_CHANGE, payload: { collections: [...dtElements]}});
  }

  _onDToggleChange (index, name, event) {
    let {dtElements} = this.state;
    dtElements[index].data.forEach(e => {
      if (e.name == name) {
        e.value = event.target.checked;
      }
    })
    this.setState({dtElements});
    this.props.dispatch({type: FORM_CHANGE, payload: { collections: [...dtElements]}});
  }
  /*
    end collection form related actions
  */

  /*
    start collection dialog related actions
  */
  _toggleDailog () {
    this.setState({dialogActive: !this.state.dialogActive});
  }

  _onDailogSelectChange (event) {
    let {collection} = this.state;
    collection.value = event.value;
    this.setState({collection});
  }

  _onRemove (index) {
    let {collection, dtElements} = this.state;
    let rItem = collection.selectedItems[index];
    collection.selectedItems = collection.selectedItems.filter(s => (typeof s === 'string') ? s != rItem.name  : s.name != rItem.name);
    collection.items.push(rItem.name);
    let elements = [];
    dtElements.forEach((e, i) => {
      if (i != index) return elements.push({...e});
    })
    this.setState({collection, dtElements: elements});
    this.props.dispatch({type: FORM_CHANGE, payload: { collections: [...elements]}});
  }

  _submitDailog (params) {
    let { collection, dtElements, elements } = this.state;
    const { collectionItems, dialogPlaceholder } = this.props;
    let currItem;
    if (! collection.value.includes(dialogPlaceholder)) {  
      collection.items = collection.items.filter(s => s != collection.value);
      collection.selectedItems = collectionItems.filter(s => (typeof s === 'string') ? !collection.items.includes(s)  : !collection.items.includes(s.name));
      currItem = collectionItems.find(c => (typeof c === 'string') ? c == collection.value : c.name == collection.value);
    }
    collection.value = dialogPlaceholder;

    //prepare elements for dynamic table
    // rowItem = [ data: elements array, ...restData]
    const data = elements.map(e => ({...e}));
    const {name, ...restData} = currItem;
    data[0].label = name;
    const rowItem = {data, ...restData};
    dtElements.push(rowItem);
    this.setState({collection, dialogActive: false, dtElements});

    this.props.dispatch({type: FORM_CHANGE, payload: { collections: [...dtElements]}});
  }
  /*
    end collection dialog related actions
  */

  render() {
    const {
      width, 
      title, 
      busy, 
      data, 
      submitControl, 
      secondaryTitle,
      collectionItems,
      headers, 
      container,
      form: {formData, toggleForm}, 
      err: { error, show}
    } = this.props;

    const {dialogActive, collection, dtElements } = this.state;


    let submit, cancel;
    if (!busy) {
      submit = this._onSubmit;
      cancel = this._onCancel;
    }

    //Basic Form related
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

    //Footer common
    let footer;
    if (submitControl) {
      footer = (
        <Footer pad={{'vertical': 'medium'}} justify='between' >
          <Button label='Add' primary={true} onClick={submit} />
          <Button label='Cancel'  onClick={cancel} />
        </Footer>
      );
    }

    //Collection related
    let collectionItem;
    if (collectionItems != undefined) {
      const data = dtElements.map(e => e.data);
      collectionItem = (
        <div>
          <Box direction='row' justify='between' pad={{vertical: 'medium'}}>
            <Box alignSelf='center'><Heading strong={true} tag='h3' >{secondaryTitle}</Heading></Box>
            <Button icon={<AddIcon />} onClick={this._toggleDailog}/>
          </Box>
          <Box>
            
            <Table headers={headers}
              elements={data}
              removeControl={true}
              onRemove={this._onRemove.bind(this)}
              container={container}
            />
          </Box>

          <Dialog
            title={secondaryTitle}
            active={dialogActive}
            onCancel={this._toggleDailog}
            onSubmit={this._submitDailog}
          >
   
            <Select options={collection.items} 
                  value={collection.value} onChange={this._onDailogSelectChange} />
            
          </Dialog>
        </div>
      );
    }

    return (
      <Box size={width} alignSelf='center' justify='center'>
        <Form plain={true}>
          <FormHeader title={title} busy={busy} /> 
          <FormFields>
            {fieldsets}
          </FormFields>
          
        </Form>

        {collectionItem}

        {footer}

      </Box>
    );
  }
}

GForm.propTypes = {
  
  data: PropTypes.array,
  title: PropTypes.string.isRequired,
  busy: PropTypes.bool,

  width: PropTypes.string,
  submitControl: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,

  secondaryTitle: PropTypes.string,
  headers: PropTypes.arrayOf(String),
  elements: PropTypes.array,
  collectionItems: PropTypes.array,
  container: PropTypes.oneOf(['table', 'list']),
  dialogPlaceholder: PropTypes.string
};

GForm.defaultProps = {
  busy: false,
  submitControl: false,
  width: 'medium',
  dialogPlaceholder: 'Select',
  container: 'table'
};

const select = (store) => {
  return {form: store.form, err: store.err};
};

export default connect(select)(GForm);

/*
  ///// Basic Form related props //////
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
        }
      ]
    }
  ]
  title: Main Form Title
  busy: to show progress

  ///// Basic Form related props //////
  secondaryTitle: Collection Title
  container: either Table or List
  headers: table headers for collection if container is 'table'
  collectionItems: It can be array of string or object {must have 'name' key}
  elements: array of dynamic rows must contain first element of label type, required by DTable. see for spec
  dialogPlaceholder: Placeholder for Dialog
  
*/