import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Box from 'grommet/components/Box';
import FormField from 'grommet/components/FormField';
import CaretUpIcon from 'grommet/components/icons/base/Up';
import CaretDownIcon from 'grommet/components/icons/base/Down';
import Button from 'grommet/components/Button';
import Select from 'grommet/components/Select';
import ClearOptionIcon from 'grommet/components/icons/base/ClearOption';
import AddIcon from 'grommet/components/icons/base/Add';
import TrashIcon from 'grommet/components/icons/base/Trash';
import TooltipButton from './TooltipButton';

class FTile extends Component {

  constructor () {
    super();
    this._toggleCollapse = this._toggleCollapse.bind(this);
    this._onHeaderChange = this._onHeaderChange.bind(this);
    this._onFormChange = this._onFormChange.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._onClearOptions = this._onClearOptions.bind(this);
    this._onAdd = this._onAdd.bind(this);
    this._onRemove = this._onRemove.bind(this);
    this.state = {
      collapsed: false
    };
  }

  
  componentWillMount() {
    this.setState({collapsed: this.props.collapsed});
  }

  _onAdd () {
    if (this.props.onAdd) {
      this.props.onAdd();
    }
  }

  _onRemove () {
    if (this.props.onRemove) {
      this.props.onRemove();
    }
  }
  
  _onClearOptions () {
    if (this.props.onClearOptions) {
      this.props.onClearOptions();
    }
  }
  
  _toggleCollapse () {
    this.setState({collapsed: !this.state.collapsed});
  }

  _onSearch (event) {
    if (this.props.onSearch) {
      this.props.onSearch(event.target.value);
    }
  }

  _onHeaderChange (event) {
    if (this.props.onHeaderChange) {
      this.props.onHeaderChange(event.value);
    }
  }

  _onFormChange (elementType, row, col, event) {
    const {onFormChange} = this.props;
    if (onFormChange) {
      if (elementType == 'input') {
        onFormChange(row, col, event.target.value);
      } else if (elementType == 'select') {
        onFormChange(row, col, event.value);
      }
    }
  }

  render() {
    const {formData: fData, headerData, addControl, addLabel, removeControl, removeLabel} = this.props;
    const formData = fData.toJS();
    let content;
    if (!this.state.collapsed && formData) {
      let form = formData.map((row,i) => {
        let rowItem = row.map((cell, j) => {
          let cellItem;
          if (cell.elementType === 'input') {
            cellItem = (
              <Box key={j} basis={cell.basis} >

                <FormField label={cell.label} error={cell.error} >
                  <input type='text' name={cell.name} value={cell.value == undefined ? '' : cell.value} onChange={this._onFormChange.bind(this, 'input', i, j)} />
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
      content = (
        <Box margin='medium'>
          {form}
        </Box>
      );
    }

    let selectContent;
    if (headerData.options) {
      selectContent = (
        <Box colorIndex='light-1' alignSelf='center' size='medium'>
          <Select placeHolder={headerData.placeholder}
            onSearch={this._onSearch}
            options={headerData.options.toJS()}
            value={headerData.value != undefined ? headerData.value.toJS() : ''}
            onChange={this._onHeaderChange} />
        </Box>
      );
    }
    let addItem;
    if (addControl == true) {
      addItem = (
        <Box alignSelf='center'>
          <TooltipButton tooltip={addLabel} icon={<AddIcon colorIndex='light-1' />}  onClick={this._onAdd} />
        </Box>
      );
    }

    let removeItem;
    if (headerData.index && headerData.index != 0 && removeControl == true) {
      removeItem = (
        <Box alignSelf='center'>
          <TooltipButton tooltip={removeLabel} icon={<TrashIcon colorIndex='light-1' />}  onClick={this._onRemove} />
        </Box>
      );
    }

    const icon = this.state.collapsed ? <TooltipButton tooltip='Expand' icon={<CaretDownIcon colorIndex='light-1'/>} onClick={this._toggleCollapse} /> : <TooltipButton tooltip='Collapse' icon={<CaretUpIcon colorIndex='light-1'/>} onClick={this._toggleCollapse} />;

    return (
      <Box colorIndex='light-2'>
        
        <Box colorIndex='unknown' direction='row' pad='none' justify='between' >
          <Box pad={{horizontal: 'small'}} alignSelf='center'> {headerData.label} {headerData.index != undefined ? ' ' + (headerData.index + 1) : ''}</Box>

          <Box direction='row' justify='end' pad={{between: 'small'}}>
            {removeItem}
            {addItem}
            {headerData.options && <Box alignSelf='center' ><TooltipButton tooltip='Clear Option' icon={<ClearOptionIcon colorIndex='light-1' />}  onClick={this._onClearOptions} /></Box>}
            {selectContent}
            <Box alignSelf='center'>{icon}</Box>
          </Box>
        </Box>

        {content}        

      </Box>
    );
  }
}

FTile.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func,

  headerData: PropTypes.object,
  onHeaderChange: PropTypes.func,
  onSearch: PropTypes.func,
  onClearOptions: PropTypes.func,

  collapsed: PropTypes.bool,

  addControl: PropTypes.bool,
  onAdd: PropTypes.func,
  addLabel: PropTypes.string,
  removeControl: PropTypes.bool,
  onRemove: PropTypes.func,
  removeLabel: PropTypes.string
};

FTile.defaultProps = {
  formData: fromJS([[]]),
  headerData: {},
  collapsed: false,
  addControl: false,
  removeControl: false,
  addLabel: 'Add',
  removeLabel: 'Remove'
};

export default FTile;

/*

formData:  array of array of {elementType: , label: , name: , value: , error: , basis:  }

headerData: {
  label: String
  options: array of String
  placeholder: String
  value: String
}

e.g
const formData = [
      [
        {
          elementType: 'input',
          label: 'Label 1',
          name: 'label1',
          value: 'Value 1',
          basis: '1/2',
          error: ''
        },
        {
          elementType: 'input',
          label: 'Label 2',
          name: 'label2',
          value: 'Value 2',
          basis: '1/2'
        }
      ],
      [
        {
          elementType: 'input',
          label: 'Label 3',
          name: 'label3',
          value: 'Value 3',
          basis: '1/3'
        },
        {
          elementType: 'input',
          label: 'Label 4',
          name: 'label4',
          value: 'Value 4',
          basis: '1/3'
        },
        {
          elementType: 'input',
          label: 'Label 3',
          name: 'label3',
          value: 'Value 3',
          basis: '1/3'
        },
      ]
    ];
*/