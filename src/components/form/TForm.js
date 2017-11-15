import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { fromJS } from 'immutable';

import {TABLE_FORM_CHANGE} from '../../actions/formActions';

import Box from 'grommet/components/Box';
import Tooltip from 'react-toolbox/lib/tooltip';
import AddIcon from 'grommet/components/icons/base/Add';
import Select from 'grommet/components/Select';
import CheckBox from 'grommet/components/CheckBox';

const THeadTooltip = Tooltip('th');

const defaultCellStyle = {
  padding: 0,
  width: 100,
  textAlign: 'center'
};

class TForm extends Component {

  constructor () {
    super();
    this._onChange = this._onChange.bind(this);
    this._init = this._init.bind(this);
    this._onColAdd = this._onColAdd.bind(this);
    this._onRowAdd = this._onRowAdd.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this.state = {
      header: [],
      data: [[]],
      filteredOptions: []
    };
  }

  componentWillMount() {
    const {data, header, name} = this.props;
    this.setState({header, data});
    this._init(name, data);
  }

  _init (name, data) {
    let tableData = [];
    let filteredOptions = new Array(data.length).fill({});
    data.forEach((row, i) => {
      let item = {};
      row.forEach((col, j) => {
        if (col.type == 'select') {
          filteredOptions = this._initFilteredOptions(filteredOptions, col.options, i, col.name, col.searchString);
        }
        if (col.value != undefined) {
          if (typeof col.value === 'number') {
            item[col.name] = String(col.value);
          } else {
            item[col.name] = col.value;
          }
        } else {
          item[col.name] = '';
        }
        
      });
      tableData.push(item);
    });
    this.setState({filteredOptions});
    this.props.dispatch({type: TABLE_FORM_CHANGE, payload: {name, data: tableData}});
  }

  _initFilteredOptions (filteredOptions, options, row, name, searchString) {
    if (searchString) {
      const temp = options.filter(e => {
        let result;
        if (typeof e === 'string') {
          result = e.toLowerCase().includes(searchString.toLowerCase());
        } else {
          result = e.label.toLowerCase().includes(searchString.toLowerCase());
        }
        return result;
      });
      if (temp.length == 0) {
        filteredOptions[row][name] = options;
      } else {
        filteredOptions[row][name] = temp;
      }
    } else {
      filteredOptions[row][name] = options;
    }
    return filteredOptions;
  }

  _onColAdd () {
    let {header, data} = this.state;
    if (typeof header[0] === 'string') {
      const tmp = header[header.length-1].replace(String(header.length-1),String(header.length));
      header.push(tmp);
    } else {
      const tmp = header[header.length-1].label.replace(String(header.length-1),String(header.length));
      header.push(tmp);
    }
    let newKey;
    data.forEach(row => {
      let item = row[row.length-1];
      let {name, value, ...rest} = item;
      newKey = name.replace(String(row.length-1), String(row.length));
      row.push({name: newKey, value: undefined, ...rest});
    });
    this.setState({header, data});
    if (this.props.onColAdd) {
      this.props.onColAdd(this.props.name);
    }
  }

  _onRowAdd () {
    let {data, filteredOptions} = this.state;
    let tmp = data[data.length-1];
    let lastRow = [];
    tmp.forEach((e, i) => {
      if (i == 0 && e.type === 'label' && e.value) {
        let v = e.value.replace(String(data.length-1),String(data.length));
        lastRow.push({...e, value: v});
      } else if (e.type == 'select') {
        filteredOptions.push({});
        filteredOptions = this._initFilteredOptions(filteredOptions, e.options, data.length, e.name, e.searchString);
        lastRow.push(fromJS(e).toJS());
      } else {
        lastRow.push(fromJS({...e, value: undefined}).toJS());
      }
    });
    data.push(lastRow);
    this.setState({data});

    const {name, form: {tableData}} = this.props;
    let temp = tableData[name];
    temp.push({});
    this.props.dispatch({type: TABLE_FORM_CHANGE, payload: {name, data: temp}});
    if (this.props.onRowAdd) {
      this.props.onRowAdd(this.props.name);
    }
  }
  
  _onChange (type, row, key, event) {
    let value;
    if (type === 'input') {
      value = event.target.value;
    } else if (type === 'select') {
      value = event.value;
    } else if (type === 'checkbox') {
      value = event.target.checked;
    } else if (type == 'link') {
      event.preventDefault();
    }
    this.props.dispatch({type: TABLE_FORM_CHANGE, payload: {name: this.props.name, row, key, value}});
    if (this.props.onChange) {
      this.props.onChange(this.props.name, row, key, value);
    }
  }

  _onSearch (name, options, event) {
    let {filteredOptions} = this.state;
    const value = event.target.value;
    filteredOptions[name] = options.filter(e => {
      let result;
      if (typeof e === 'string') {
        result = e.toLowerCase().includes(value.toLowerCase());
      } else {
        result = e.toLowerCase().includes(value.toLowerCase());
      }
      return result;
    });
    this.setState({filteredOptions});
  }

  render() {
    console.log('render TForm');
    const {header, data, filteredOptions} = this.state;
    const {name, rows, cols, controls, dynamicRow, dynamicCol, form: {tableData}, cellStyle, size, id, style: tableStyle} = this.props;

    let style = {...defaultCellStyle};
    if (cellStyle) {
      style = {...style, ...cellStyle};
    }

    let formData = tableData[name];
    if (formData == undefined) {
      formData = new Array(data.length).fill({});
    }
 
    let head = header.map((e, i) => {
      let item;
      if (typeof e === 'string') {
        item = (<th key={i} style={{padding: 5}}>{e}</th>);
      } else if (typeof e === 'object') {
        if (e.tooltip) {
          item = (<THeadTooltip key={i} tooltip={e.tooltip} style={{padding: 5}}>{e.label}</THeadTooltip>);
        } else {
          item = (<th key={i} style={{padding: 5}}>{e.label}</th>);
        }
      }
      return item;
    });
    if (dynamicCol) {
      head.push(<th key={header.length+1}><AddIcon size='xsmall' onClick={this._onColAdd}/></th>);
    }

    const body = data.map((row, i) => {
      let colItems = [];
      row.forEach((col, j) => {
        let cell;
        if (col.type === 'label') {
          let value;
          if (col.value != undefined) {
            value = typeof col.value == 'number' ? String(col.value) : col.value;
          }
          cell = (<td key={j} rowSpan={col.rowspan || 1} colSpan={col.colspan || 1} style={{...style, background: undefined}}>{value || ''}</td>);
        } else if (col.type == 'link') {
          cell = (<td key={j} rowSpan={col.rowspan || 1} colSpan={col.colspan || 1} style={style}><a onClick={this._onChange.bind(this, 'link', i, col.name)}>{col.value || ''}</a></td>);
        } else if (col.type === 'input') {
          let value;
          if (formData[i] && formData[i][col.name] != undefined) {
            value = typeof formData[i][col.name] == 'number' ? String(formData[i][col.name]) : formData[i][col.name];
          } else if (col.value != undefined) {
            value = typeof col.value == 'number' ? String(col.value) : col.value;
          }
          cell = (
            <td key={j} rowSpan={col.rowspan || 1} colSpan={col.colspan || 1} style={{padding: 5}}>
              <input style={style} 
                type='text' 
                disabled={col.disabled || false}
                placeholder={col.placeholder} 
                value={value || ''} 
                onChange={this._onChange.bind(this, 'input', i, col.name)} 
                />
            </td>
          );
        } else if (col.type === 'select') {
          cell = (
            <td key={j} rowSpan={col.rowspan || 1} colSpan={col.colspan || 1} style={{padding: 5}}>
              <Select options={filteredOptions[i][col.name]} 
                placeHolder={col.placeholder}
                disabled={col.disabled || false}
                value={formData[i][col.name] || col.value || ''} 
                onChange={this._onChange.bind(this, 'select', i, col.name)}
                onSearch={this._onSearch.bind(this, i, col.options)}
                style={style} />
            </td>
          );
        } else if (col.type === 'checkbox') {
          cell = (
            <td key={j} rowSpan={col.rowspan || 1} colSpan={col.colspan || 1} style={{padding: 5}}>
              <CheckBox 
                disabled={col.disabled || false}
                checked={formData[i][col.name] || col.value || false}  
                toggle={col.toggle || false} 
                onChange={this._onChange.bind(this, 'checkbox', i, col.name)}/>
            </td>
          );
        }
        colItems.push(cell);
      });
      return (
        <tr key={i}>{colItems}</tr>
      );
    });
    if (dynamicRow) {
      body.push(<tr key={data.length+1}><td><AddIcon size='xsmall' onClick={this._onRowAdd}/></td></tr>)
    }


    return (
      <Box alignSelf='center' size={size}>
        <table id={id} style={{width: '100%', ...tableStyle}}>
          <thead><tr>{head}</tr></thead>
          <tbody>{body}</tbody>
        </table>
      </Box>
    );
  }
}

TForm.propTypes = {
  name: PropTypes.string,
  header: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      tooltip: PropTypes.string
    })
  ])).isRequired,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['label','link','input','select','checkbox','hidden']).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string, 
      PropTypes.shape({label: PropTypes.string.isRequired, value: PropTypes.string.isRequired}),
      PropTypes.number
    ]),
    placeholder: PropTypes.string,
    options: PropTypes.array,
    searchString: PropTypes.string,    //applicable for select type
    disabled: PropTypes.bool,
    rowspan: PropTypes.number,
    colspan: PropTypes.number
  }))).isRequired,
  controls: PropTypes.oneOf(['add','remove']),
  dynamicRow: PropTypes.bool,
  dynamicCol: PropTypes.bool,
  cellStyle: PropTypes.object,
  onChange: PropTypes.func,
  onRowAdd: PropTypes.func,
  onColAdd: PropTypes.func,
  size: PropTypes.oneOf(['xsmall','small','large','xlarge','xxlarge'])
};

TForm.defaultProps = {
  name: 'table1',
  dynamicRow: false,
  dynamicCol: false
};

const select = (store) => {
  return {form: store.form, err: store.err};
};

export default connect(select)(TForm);

