import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';

import {FORM_CHANGE_BASIC, FORM_CHANGE_COLLECTION} from '../actions/formActions';

import AddIcon from 'grommet/components/icons/base/Add';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import DateTime from 'grommet/components/DateTime';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import FormHeader from './FormHeader';
import Heading from 'grommet/components/Heading';
import Select from 'grommet/components/Select';
import TextInput from 'grommet/components/TextInput';
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
    this._onDDateChange = this._onDDateChange.bind(this);
    this._loadCollectionData = this._loadCollectionData.bind(this);
    this.state = {
      dialogActive: [],
      collection: [],
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
    console.log('GForm will mount');
    let {data, collectionData} = this.props;

    if (data != undefined) {
      let formData = {};
      data.forEach(fieldset => {
        fieldset.elements.forEach(element => {
          if (element.elementType == 'checkbox') {
            formData[element.name] = (element.value == undefined) ? false : element.value;
          }
          if (element.elementType == 'input') {
            formData[element.name] = (element.value == undefined) ? '' : element.value;
          }
          if (element.elementType == 'select') {
            formData[element.name] = (element.value == undefined) ? element.placeholder : element.value;
          }
          if (element.elementType == 'date') {
            formData[element.name] = element.value;
          }
        })
      })
      if (Object.keys(formData).length != 0) {
        this.props.dispatch({type: FORM_CHANGE_BASIC, payload: {...formData}});
      }
    }
    
    if (collectionData) {
      this._loadCollectionData(collectionData);
    }    
  }

  componentWillReceiveProps(nextProps) {
    const {collectionData} = nextProps;
    if (this.props.collectionData != undefined && collectionData == undefined) {
      this.setState({collection: [], elements: [], dtElements: [], dialogActive: []});
    }
    if ((this.props.collectionData == undefined && collectionData != undefined) || (this.props.collectionData != undefined && collectionData != undefined && this.props.collectionData.length != collectionData.length)) {
      this._loadCollectionData(collectionData);
    }
  }
  

  _loadCollectionData (collectionData) {
    let collection = [];
    let elements = [];
    let dtElements = [];
    let dialogActive = [];
    for (let idx = 0; idx < collectionData.length; idx++) {
      const cData = collectionData[idx];
      let coll = {};
      coll.items = cData.collectionItems
                      .filter(e => ((typeof e === 'string') ? true : (e.selected == undefined ? true : !e.selected)))
                      .map(c => (typeof c === 'string') ? c : c.name);
      elements[idx] = cData.elements.map(e => {
        if (e.type == 'input') {
          e.action = this._onDInputChange.bind(this, idx);
        }
        if (e.type == 'checkbox') {
          e.action = this._onDToggleChange.bind(this, idx);
        }
        if (e.type == 'date') {
          e.action = this._onDDateChange.bind(this, idx);
        }
        return e;
      });
      coll.value = (cData.dialogPlaceholder != undefined) ? cData.dialogPlaceholder: 'Select';
      coll.selectedItems = cData.collectionItems.filter(s => (typeof s === 'string') ? !coll.items.includes(s)  : !coll.items.includes(s.name));
      //create dtElements
      coll.selectedItems.forEach(e => {
        let rowItem;
        const data = elements[idx].map(e => ({...e}));
        
        if (typeof e === 'string') {
          data[0].label = e;
          rowItem = {data};
        } else {
          const {id, disabled, ...restData} = e;
          data.forEach((d,i) => {
            if (d.type == 'label') {
              d.label = e[d.key];
              if (i == 0 && id != undefined) {
                d.value = id;
              }
            } else {
              d.value = e[d.name];
              d.disabled = disabled;
            }
          });
          rowItem = {data, ...restData};
        }
        if (dtElements[idx] != undefined) {
          dtElements[idx].push(rowItem);
        } else {
          dtElements[idx] = [rowItem];
        }
      });
      collection.push(coll);
      dialogActive.push(false);
      if (dtElements[idx] != undefined) {
        this.props.dispatch({type: FORM_CHANGE_COLLECTION, payload: {row: idx, collection: [...dtElements[idx]]}});
      }
    }

    this.setState({collection, elements, dtElements, dialogActive});
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
    this.props.dispatch({type: FORM_CHANGE_BASIC, payload: {[name]: event.target.checked}});
  }

  _onSelectChange (name, event) {
    this.props.dispatch({type: FORM_CHANGE_BASIC, payload: {[name]: event.value}});
  }

  _onInputChange (name, event) {
    this.props.dispatch({type: FORM_CHANGE_BASIC, payload: {[name]: event.target.value}});
  }

  _onSuggestionSelect (name, event,c) {
    this.props.dispatch({type: FORM_CHANGE_BASIC, payload: {[name]: event.suggestion}});
  }

  _onDateChange (name, value) {
    this.props.dispatch({type: FORM_CHANGE_BASIC, payload: {[name]: new Date(value)}});
  }
  /*
    end basic form related actions
  */

  /*
    start collection form related actions
  */
  _onDInputChange (row, col, name, event) {
    let {dtElements} = this.state;
    dtElements[row][col].data.forEach(e => {
      if (e.name == name) {
        e.value = event.target.value;
      }
    })
    this.setState({dtElements});
    this.props.dispatch({type: FORM_CHANGE_COLLECTION, payload: {row, collection: [...dtElements[row]]}});
  }

  _onDDateChange (row, col, name, value) {
    let {dtElements} = this.state;
    dtElements[row][col].data.forEach(e => {
      if (e.name == name) {
        e.value = moment(value, 'DD MMM, YY').toDate();
      }
    })
    this.setState({dtElements});
    this.props.dispatch({type: FORM_CHANGE_COLLECTION, payload: {row, collection: [...dtElements[row]]}});
  }

  _onDToggleChange (row, col, name, event) {
    let {dtElements} = this.state;
    dtElements[row][col].data.forEach(e => {
      if (e.name == name) {
        e.value = event.target.checked;
      }
    })
    this.setState({dtElements});
    this.props.dispatch({type: FORM_CHANGE_COLLECTION, payload: {row, collection: [...dtElements[row]]}});
  }
  /*
    end collection form related actions
  */

  /*
    start collection dialog related actions
  */
  _toggleDailog (index) {
    let {dialogActive} = this.state;
    dialogActive[index] = !dialogActive[index];
    this.setState({dialogActive});
  }

  _onDailogSelectChange (index, event) {
    let {collection} = this.state;
    collection[index].value = event.value;
    this.setState({collection});
  }

  /*
    row = collectionData index
    col = specific collectionItem index within row'th collectionData
  */
  _onRemove (row, col) {
    let {collection, dtElements} = this.state;
    let coll = collection[row];
    let rItem = coll.selectedItems[col];
    coll.selectedItems = coll.selectedItems.filter(s => (typeof s === 'string') ? s != rItem.name  : s.name != rItem.name);
    coll.items.push(rItem.name);
    let elements = [];
    dtElements[row].forEach((e, i) => {
      if (i != col) return elements.push({...e});
    })
    dtElements[row] = elements
    collection[row] = coll;
    this.setState({collection, dtElements});
    this.props.dispatch({type: FORM_CHANGE_COLLECTION, payload: {row, collection: [...dtElements[row]]}});
  }

  _submitDailog (index) {
    let { collection, dtElements, elements, dialogActive } = this.state;
    const { collectionData } = this.props;
    let currItem;
    let coll = collection[index];

    if (! coll.value.includes(collectionData[index].dialogPlaceholder)) {  
      coll.items = coll.items.filter(s => s != coll.value);
      coll.selectedItems = collectionData[index].collectionItems.filter(s => (typeof s === 'string') ? !coll.items.includes(s)  : !coll.items.includes(s.name));
      currItem = collectionData[index].collectionItems.find(c => (typeof c === 'string') ? c == coll.value : c.name == coll.value);
    }
    coll.value = collectionData[index].dialogPlaceholder;
    collection[index] = coll;

    //prepare elements for dynamic table
    // rowItem = [ data: elements array, ...restData]
    let rowItem;
    const data = elements[index].map(e => ({...e}));

    if (typeof currItem === 'string') {
      data[0].label = currItem;
      rowItem = {data};
    } else {
      const {id, disabled, ...restData} = currItem;
      data.forEach((d,i) => {
        if (d.type == 'label') {
          d.label = currItem[d.key];
          if (i == 0 && id != undefined) {
            d.value = id;
          }
        } else {
          d.value = currItem[d.name];
          d.disabled = disabled;
        }
      });
      rowItem = {data, ...restData};
    }
    if (dtElements[index] != undefined) {
      dtElements[index].push(rowItem);
    } else {
      dtElements[index] = [rowItem];
    }
    dialogActive[index] = false;
    this.setState({collection, dialogActive, dtElements});
    this.props.dispatch({type: FORM_CHANGE_COLLECTION, payload: {row: index, collection: [...dtElements[index]]}});
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
      collectionData,
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
    let basicForm;
    if (data != undefined) {
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
          const disabled = (e.disabled != undefined) ? e.disabled : false;
          if (e.elementType == 'input') {
            const type = (e.type != undefined) ? e.type : 'text';
            element = (
              <FormField key={i} label={e.label} error={error[e.name]}>
                <input type={type} name={e.name} disabled={disabled} value={formData[e.name] == undefined ? '' : formData[e.name]} onChange={this._onInputChange.bind(this, e.name)} />
              </FormField>
            );
          } else if (e.elementType == 'text-input') {
            element = (
              <FormField key={i} label={e.label} error={error[e.name]}>
                <TextInput name={e.name} 
                  value={formData[e.name]} 
                  onDOMChange={this._onInputChange.bind(this, e.name)}
                  onSelect={this._onSuggestionSelect.bind(this, e.name)}
                  suggestions={e.suggestions || []}
                  />
              </FormField>
            );
          } else if (e.elementType == 'date') {
            element = (
              <FormField key={i} label={e.label} error={error[e.name]}>
                <DateTime name={e.name} format='MM/DD/YYYY' value={formData[e.name]} onChange={this._onDateChange.bind(this, e.name)}/>
              </FormField>
            );
          } else if (e.elementType == 'select') {
            element = (
              <FormField key={i} label={e.label}>
                <Select options={e.options} 
                  placeHolder={e.placeholder}
                  value={formData[e.name]} onChange={this._onSelectChange.bind(this, e.name)} />
              </FormField>
            );
          } else if (e.elementType == 'checkbox') {
            element = (
              <FormField key={i}>
                <CheckBox label={e.label} checked={formData[e.name] == undefined ? false : formData[e.name]} toggle={true} onChange={this._onToggleChange.bind(this, e.name)}/>
              </FormField>
            );
          }
          return element;
        });
        

        return (
          <fieldset key={idx}>
            {title}
            {elements}
          </fieldset>
        );
      });
      basicForm = (
        <Form plain={true}>
          <FormHeader title={title} busy={busy} /> 
          <FormFields>
            {fieldsets}
          </FormFields>
          
        </Form>
      );
    }
    
    //Collection related
    let collectionItems;
    if (collectionData != undefined) {

      collectionItems = collectionData.map((cData, idx) => {
        const data = dtElements[idx] != undefined ? dtElements[idx].map(e => e.data): [];
        let secondaryHeader;
        if (cData.secondaryTitle != undefined) {
          secondaryHeader = (
            <Box direction='row' justify='between' pad={{vertical: 'medium'}}>
              <Box alignSelf='center'><Heading strong={true} tag='h3' >{cData.secondaryTitle}</Heading></Box>
              <Button icon={<AddIcon />} onClick={this._toggleDailog.bind(this, idx)}/>
            </Box>
          );
        }
        const dialogContent = (collection[idx] == undefined) ? null : (
          <Select options={collection[idx].items} 
          value={collection[idx].value} onChange={this._onDailogSelectChange.bind(this, idx)} />
        );
        const collectionItem = (
          <Box full='horizontal' key={idx} >
            {secondaryHeader}
            <Box >
              <Table headers={cData.headers}
                elements={data}
                removeControl={cData.removeControl == undefined ? true: cData.removeControl}
                onRemove={this._onRemove.bind(this, idx)}
                container={cData.container}
              />
            </Box>

            <Dialog
              title={cData.secondaryTitle}
              active={dialogActive[idx] == undefined? false: dialogActive[idx]}
              onCancel={this._toggleDailog.bind(this, idx)}
              onSubmit={this._submitDailog.bind(this, idx)}
            >
              {dialogContent}
            </Dialog>
          </Box>
        );
        return collectionItem;
      });
    }

    //Footer common
    let footer;
    if (submitControl) {
      footer = (
        <Footer pad={{'vertical': 'medium'}} justify='between' >
          <Button label='Submit' primary={true} onClick={submit} />
          <Button label='Cancel'  onClick={cancel} />
        </Footer>
      );
    }

    return (
      <Box full='horizontal' alignSelf='center' justify='center'>
        
        {basicForm}

        {collectionItems}

        {footer}

      </Box>
    );
  }
}

GForm.propTypes = {
  
  data: PropTypes.array,
  title: PropTypes.string,
  busy: PropTypes.bool,

  submitControl: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,

  collectionData: PropTypes.array

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

  secondaryTitle: PropTypes.string,
  headers: PropTypes.arrayOf(String),
  elements: PropTypes.array,
  collectionItems: PropTypes.array,
  container: PropTypes.oneOf(['table', 'list']),
  dialogPlaceholder: PropTypes.string

  ///// Basic Form related props //////
  data: array of object
  [
    {
      title: optional String
      elements: [
        {
          elementType: input|select|checkbox|radio|text-input,             required  - all 
          type: text|email|password   in case of input    optional  - input
          label: string,                                  required  - all
          name: string,                                   required  - all
          value: string|boolean                    optional  - all
          placeholder: string optional                    optional  - input
          options: arrayOf(string) - if type is select    optional  - select
          suggestions: array of string
        }
      ]
    }
  ]
  title: Main Form Title
  busy: to show progress

  ///// Basic Form related props //////

  Definition:

  secondaryTitle: Collection Title
  container: either Table or List
  headers: table headers for collection if container is 'table'
          it can be string or object: {label: string, tooltip: string}
  collectionItems: It can be array of string or object {must have 'name' key, and optional 'id'}
  elements: array of dynamic rows must contain first element of label type, required by DTable. see for spec
  dialogPlaceholder: Placeholder for Dialog

  actual data:
  collectionData: [
    {
      secondaryTitle: 
      container: 
      headers: 
      collectionItems: string | {name: , selected: }
      removeControl: 
      elements: 
      dialogPlaceholder: 
    }
  ]
  
*/