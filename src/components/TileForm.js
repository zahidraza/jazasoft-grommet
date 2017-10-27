import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { fromJS } from 'immutable';

import {TILE_FORM_CHANGE} from '../actions/formActions';
import Box from 'grommet/components/Box';
import FTile from './FTile';

class TileForm extends Component {

  constructor () {
    super();
    this._onFormChange = this._onFormChange.bind(this);
    this._onHeaderChange = this._onHeaderChange.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._onClearOptions = this._onClearOptions.bind(this);
    this._onAdd = this._onAdd.bind(this);
    this.state = {
      filteredOptions: fromJS([[]])
    };
  }

  componentWillMount() {
    let filteredOptions = this.props.data.map(e => e.get('headerOptions'));
    this.setState({filteredOptions});
    this.props.dispatch({type: TILE_FORM_CHANGE, payload: {data: this.props.data}});
  }

  _onRemove (idx) {
    let {filteredOptions} = this.state;
    let {tileData: data} = this.props.form;
    let newFilteredOptions = filteredOptions.delete(idx);
    const newData = data.delete(idx);
    this.props.dispatch({type: TILE_FORM_CHANGE, payload: {data: newData}});
    this.setState({filteredOptions: newFilteredOptions});
  }

  _onAdd (idx) {
    let {filteredOptions} = this.state;
    let {tileData: data} = this.props.form;
    let newFilteredOptions = filteredOptions.insert(idx+1, filteredOptions.get(idx));
    let tmp = data.get(idx);
    tmp = tmp.set('index', tmp.get('index')+1);
    const newData = data.insert(idx+1, tmp);
    this.props.dispatch({type: TILE_FORM_CHANGE, payload: {data: newData}});
    this.setState({filteredOptions: newFilteredOptions});
  }

  _onFormChange (idx, row, col, value) {
    let {tileData: data} = this.props.form;
    data = data.setIn([idx, 'formData', row, col, 'value'], value);
    this.props.dispatch({type: TILE_FORM_CHANGE, payload: {data}});
  }

  _onHeaderChange (idx, value) {
    let {tileData: data} = this.props.form;
    let tmp = data.toJS();

    tmp[idx].headerValue = value;
    const selectedOption = tmp[idx].headerOptions.find(e => e.id == value.id);
    tmp[idx].formData.forEach(row => {
      row.forEach(col => {
        col.value = selectedOption[col.name];
      })
    });

    data = fromJS(tmp);
    this.props.dispatch({type: TILE_FORM_CHANGE, payload: {data}});
  }

  _onClearOptions (idx) {
    let {tileData: data} = this.props.form;
    let tmp = data.toJS();
    tmp[idx].formData.forEach(row => {
      row.forEach(col => {
        col.value = '';
      });
    });
    tmp[idx].headerValue = undefined;
    data = fromJS(tmp);
    this.props.dispatch({type: TILE_FORM_CHANGE, payload: {data}});
  }

  _onSearch (idx, value) {
    let {tileData: data} = this.props.form;
    let {filteredOptions} = this.state;
    const tmp = data.getIn([idx, 'headerOptions']).toJS().filter(e => {
      if (typeof e === 'string') {
        return e.toLowerCase().includes(value.toLowerCase());
      }
      if (typeof e === 'object') {
        if (typeof value === 'object') {
          return e.label.toLowerCase().includes(value.label.toLowerCase());
        }
        if (typeof value === 'string') {
          return e.label.toLowerCase().includes(value.toLowerCase());
        }
      }
    });
    filteredOptions = filteredOptions.set(idx, fromJS(tmp));
    this.setState({filteredOptions});
  }
  

  render() {

    let {tileData: data} = this.props.form;
    const { filteredOptions } = this.state;

    const items = data.map((item, idx) => {
      let headerData = {
        label: item.get('headerLabel'),
        options: filteredOptions.get(idx),
        placeholder: item.get('headerPlaceholder'),
        value: item.get('headerValue'),
        index: item.get('index')
      };
      let collapsed = item.get('collapsed') == undefined ? false : item.get('collapsed');
      return (
        <FTile key={idx}
          headerData={headerData}
          formData={item.get('formData')}
          collapsed={collapsed}
          onFormChange={this._onFormChange.bind(this, idx)}
          onHeaderChange={this._onHeaderChange.bind(this, idx)}
          onSearch={this._onSearch.bind(this, idx)}
          onClearOptions={this._onClearOptions.bind(this,idx)}
          addControl={item.get('addControl') == undefined ? false: item.get('addControl')}
          onAdd={this._onAdd.bind(this, idx)}
          addLabel={item.get('addLabel')}
          removeControl={item.get('removeControl') == undefined ? false: item.get('removeControl')}
          onRemove={this._onRemove.bind(this, idx)}
          removeLabel={item.get('removeLabel')}
        />
      );
    });

    const content = (
      <Box pad={{between: 'medium'}}>{items}</Box>
    );

    return (
      <Box>

        {content}

      </Box>
    );
  }
}

TileForm.propTypes = {
  data: PropTypes.object
};

TileForm.defaultProps = {
  data: fromJS([])
};

const select = (store) => {
  return {form: store.form, err: store.err};
};

export default connect(select)(TileForm);

/*

  data: [
    {
      headerName:
      headerLabel:
      headerOptions:
      headerPlaceholder:
      headerValue:
      formData: [
        [
          {
            elementType: 'input',
            label: 'Label 1',
            name: 'label1',
            value: 'Value 1',
            basis: '1/2',
            error: ''  //TODO: handle
          },
          {
            ...
          }
        ]
        [
          ...
        ]
      ]
    }
  ]
*/