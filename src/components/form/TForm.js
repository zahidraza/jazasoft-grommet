import React, { Component } from 'react';
import PropTypes, { node } from 'prop-types';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { fromJS } from 'immutable';

import {TABLE_FORM_CHANGE} from '../../actions/formActions';

import Box from 'grommet/components/Box';
import Tooltip from 'react-toolbox/lib/tooltip';
import AddIcon from 'grommet/components/icons/base/Add';
import Select from 'grommet/components/Select';
import CheckBox from 'grommet/components/CheckBox';

const THeadTooltip = Tooltip('th');

const cellWidth = {
  xsmall: 50,
  small: 100,
  medium: 150,
  large: 200,
  xlarge: 250
};

const defaultCellStyle = {
  padding: 0,
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
  
  _onChange (type, row, key, path, event) {
    let value;
    if (type === 'input') {
      value = event.target.value;
    } else if (type === 'select') {
      value = event.value;
    } else if (type === 'checkbox') {
      value = event.target.checked;
    } else if (type == 'link') {
      event.preventDefault();
      if (path) {
        this.props.history.push(path);
      }
    }
    this.props.dispatch({type: TABLE_FORM_CHANGE, payload: {name: this.props.name, row, key, value}});
    if (this.props.onChange) {
      this.props.onChange(this.props.name, row, key, value);
    }
  }

  _onSearch (row, name, options, event) {
    let {filteredOptions} = this.state;
    const value = event.target.value;
    filteredOptions[row][name] = options.filter(e => {
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
      let width = cellWidth.medium;
      if (e.width && typeof e.width == 'number') {
        width = e.width;
      } else if (e.width && typeof e.width == 'string') {
        width = cellWidth[e.width];
      }
      if (typeof e === 'string') {
        item = (<th key={i} style={{padding: 5, width}}>{e}</th>);
      } else if (typeof e === 'object') {
        if (e.type) { //react element
          item = <th key={i}> {e} </th>;
        } else if (e.tooltip) {
          item = (<THeadTooltip key={i} tooltip={e.tooltip} style={{padding: 5, width}}>{e.label}</THeadTooltip>);
        } else {
          item = (<th key={i} style={{padding: 5, width}}>{e.label}</th>);
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
          cell = (<td key={j} rowSpan={col.rowspan || 1} colSpan={col.colspan || 1} style={style}><a onClick={this._onChange.bind(this, 'link', i, col.name, col.path)}>{col.value || ''}</a></td>);
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
                onChange={this._onChange.bind(this, 'input', i, col.name, undefined)} 
                />
            </td>
          );
        } else if (col.type === 'select') {
          let options = filteredOptions[i][col.name];
          if (options.length > 0 && ((typeof options[0] == 'object' && options[0].value != undefined) || (typeof options[0] == 'string' && options[0] != 'No Value'))) {
            options.unshift({label: 'No Value', value: undefined});
          }
          
          cell = (
            <td key={j} rowSpan={col.rowspan || 1} colSpan={col.colspan || 1} style={{padding: 5}}>
              <Select options={options} 
                placeHolder={col.placeholder}
                disabled={col.disabled || false}
                value={formData[i][col.name] || col.value || ''} 
                onChange={this._onChange.bind(this, 'select', i, col.name, undefined)}
                onSearch={this._onSearch.bind(this, i, col.name, col.options)}
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
                onChange={this._onChange.bind(this, 'checkbox', i, col.name, undefined)}/>
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
        <table id={id} style={{width: '100%',marginTop: 20, ...tableStyle}}>
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
      tooltip: PropTypes.string,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['xsmall','small','medium','large','xlarge'])])
    }),
    PropTypes.node
  ])).isRequired,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['label','link','input','select','checkbox','hidden']).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string, 
      PropTypes.shape({label: PropTypes.string.isRequired, value: PropTypes.string.isRequired}),
      PropTypes.number,
      PropTypes.node
    ]),
    placeholder: PropTypes.string,
    options: PropTypes.array,
    path: PropTypes.string,  //applicable for link
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

export default withRouter(connect(select)(TForm));

