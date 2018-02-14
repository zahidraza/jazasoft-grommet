import React, { Component } from 'react';
import PropTypes, { node, element, instanceOf } from 'prop-types';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { fromJS } from 'immutable';

import {TABLE_FORM_CHANGE, FORM_CHANGE} from '../../actions/formActions';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Tooltip from 'react-toolbox/lib/tooltip';
import AddIcon from 'grommet/components/icons/base/Add';
import Select from 'grommet/components/Select';
import CheckBox from 'grommet/components/CheckBox';
import ViewIcon from 'grommet/components/icons/base/View';
import EditIcon from 'grommet/components/icons/base/Edit';
import PrintIcon from 'grommet/components/icons/base/Print';
import TrashIcon from 'grommet/components/icons/base/Trash';

const THeadTooltip = Tooltip('th');

const ButtonTooltip = Tooltip((props) => {
  const {theme, ...restProps} = props;
  return <Button {...restProps} />;
});

const cellWidth = {
  xsmall: 50,
  small: 100,
  medium: 150,
  large: 200,
  xlarge: 250,
  xxlarge: 300,
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
    this._onActionClick = this._onActionClick.bind(this);
    this._onPaste = this._onPaste.bind(this);
    this._parse = this._parse.bind(this);
    this.state = {
      header: [],
      data: [[]],
      filteredOptions: []
    };
  }

  componentWillMount() {
    const {data, header, name} = this.props;
    this.setState({header, data});
    this._init(name, data, header);
  }  

  _init (name, data, header) {
    let tableData = [];
    let filteredOptions = new Array(data.length).fill({});
    data.forEach((row, i) => {
      let item = {};
      let k = 0;
      row.forEach((col, j) => {
        let key = (typeof header[k] == 'object' && header[k].key != undefined)? header[k].key : '';
        if (col.type == 'hidden') {
          key = col.name;
        } else {
          k++;
        }
        if (col.type == 'select') {
          filteredOptions[i][key] = col.options;
        }
        if (col.value != undefined) {
          if (typeof col.value === 'number') {
            item[key] = String(col.value);
          } else {
            item[key] = col.value;
          }
        } else {
          item[key] = '';
        }
        
      });
      tableData.push(item);
    });
    console.log(tableData);
    this.setState({filteredOptions});
    this.props.dispatch({type: TABLE_FORM_CHANGE, payload: {name, data: tableData}});
  }

  _onColAdd () {
    let {header, data} = this.state;
    if (typeof header[0] === 'object') {
      header.push({...header[header.length-1], label: ''});
    } else {
      header.push('');
    }
    let newKey;
    data.forEach(row => {
      let item = row[row.length-1];
      let {name, value, ...rest} = item;
      newKey = 'newKey';
      row.push({name: newKey, value: undefined, ...rest});
    });
    this.setState({header, data});
    if (this.props.onColAdd) {
      this.props.onColAdd(this.props.name);
    }
  }

  _onRowAdd () {
    console.log('_onRowAdd');
    let {data, filteredOptions, header} = this.state;
    let tmp = data[data.length-1];
    let lastRow = [];
    let filteredOption = {};
    let k = 0;
    tmp.forEach((e, i) => {
      if (e.type == 'select') {
        const key = (typeof header[k] == 'object' && header[k].key != undefined) ? header[k].key : '';
        filteredOption[key] = e.options;
      }
      lastRow.push(fromJS({...e, value: undefined}).toJS());
      if (e.type != 'hidden') {
        k++;
      }
    });
    filteredOptions.push(filteredOption);
    data.push(lastRow);
    console.log(data, filteredOptions);
    this.setState({data, filteredOptions});

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
    let dispatchEvent = true;
    if (type === 'input') {
      value = event.target.value;
      const data = this._parse(value);
      let count = 0;
      if (data) {
        data.forEach(e => e.forEach(f => count++));
      }
      if (count > 1) {
        dispatchEvent = false;
      }
    } else if (type === 'select') {
      value = event.value;
    } else if (type === 'checkbox') {
      value = event.target.checked;
    } else if (type === 'radio-button') {
      const {form: {tableData}} = this.props;
      const data = tableData[this.props.name];
      const idx = data.findIndex((e, i) => row != i && e[key] && e[key] == true);
      value = true;
      this.props.dispatch({type: TABLE_FORM_CHANGE, payload: {name: this.props.name, row: idx, key, value: false}});
    } else if (type == 'link') {
      event.preventDefault();
      value = event.target.innerHTML;
      if (path) {
        this.props.history.push(path);
      }
    }
    if (dispatchEvent) {
      this.props.dispatch({type: TABLE_FORM_CHANGE, payload: {name: this.props.name, row, key, value}});
    }
    if (this.props.onChange) {
      this.props.onChange(this.props.name, row, key, value);
    }
  }

  _onPaste(name, row, col, event) {
    const data = this._parse(event.clipboardData.getData('text/plain'));
    let formData = this.props.form.tableData[name];
    for (let i = 0; i < (row + data.length - formData.length); i++) {
      this._onRowAdd();
    }
    if (data && data[0] && formData && formData[0]) {
      for (let i = 0; i < (col + data[0].length - Object.keys(formData[0]).length); i++) {
        this._onColAdd();
      }
    }
    for (let i = row, j = 0; j < data.length; i++, j++) {
      let x = formData[i] || {};
      let y = data[j];
      for (let m = col, n = 0; n < y.length; m++, n++) {
        x['size'+m] = y[n];
      }
    }
    this.props.dispatch({type: FORM_CHANGE, payload: {name: this.props.name, data: formData}});
  }

  _parse(str) {
    return str.split(/\r\n|\n|\r/)
    .map((row) => row.split('\t'))
  }

  _onActionClick (row, action, idx, path, event) {
    if (path) {
      const { history } = this.props;
      history.push(`${path}`);
    }

    if (this.props.onActionClick) {
      this.props.onActionClick(row, action, idx, event);
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
    let itemIsRow = false;
    let head = header.map((e, i) => {
      let item;
      if (e instanceof Array) {
        itemIsRow = true;
        let rowItem = e.map((cell, j) => {
          let cellItem;
          let width = cellWidth.medium, textAlign = cell.align || 'center';
          if (cell.width && typeof cell.width == 'number') {
            width = cell.width;
          } else if (cell.width && typeof cell.width == 'string') {
            width = cellWidth[cell.width];
          }
          if (typeof e === 'string') {
            cellItem = (<th key={j} rowSpan={cell.rowspan || 1} colSpan={cell.colspan || 1} style={{padding: 5, width, textAlign}}>{e}</th>);
          } else if (typeof e === 'object') {
            if (cell.type) { //react element
              cellItem = <th key={j} rowSpan={cell.rowspan || 1} colSpan={cell.colspan || 1}> {e} </th>;
            } else if (cell.tooltip) {
              cellItem = (<THeadTooltip key={j} rowSpan={cell.rowspan || 1} colSpan={cell.colspan || 1} tooltip={cell.tooltip} style={{padding: 5, width, textAlign}}>{cell.label}</THeadTooltip>);
            } else {
              cellItem = (<th key={j} rowSpan={cell.rowspan || 1} colSpan={cell.colspan || 1} style={{padding: 5, width, textAlign}}>{cell.label}</th>);
            }
          }
          return cellItem;
        });
        if (dynamicCol && i == 0) {
          rowItem.push(<th key={e.length+1}><AddIcon size='xsmall' onClick={this._onColAdd}/></th>);
        }
        item = (
          <tr key={i}>{rowItem}</tr>
        );
      } else {
        let width = cellWidth.medium, textAlign = e.align || 'center';
        if (e.width && typeof e.width == 'number') {
          width = e.width;
        } else if (e.width && typeof e.width == 'string') {
          width = cellWidth[e.width];
        }
        if (typeof e === 'string') {
          item = (<th key={i} colSpan={e.colspan || 1} style={{padding: 5, width, textAlign}}>{e}</th>);
        } else if (typeof e === 'object') {
          if (e.type) { //react element
            item = <th key={i}  colSpan={e.colspan || 1}> {e} </th>;
          } else if (e.tooltip) {
            item = (<THeadTooltip key={i} colSpan={e.colspan || 1} tooltip={e.tooltip} style={{padding: 5, width, textAlign}}>{e.label}</THeadTooltip>);
          } else {
            item = (<th key={i} colSpan={e.colspan || 1} style={{padding: 5, width, textAlign}}>{e.label}</th>);
          }
        }
      }
      return item;
    });
    if (!itemIsRow) {
      if (dynamicCol) {
        head.push(<th key={header.length+1}><AddIcon size='xsmall' onClick={this._onColAdd}/></th>);
      }
      head = (<tr>{head}</tr>)
    }

    const body = data.map((row, i) => {
      let colItems = [];
      let k = 0;
      row.forEach((col, j) => {
        let head;
        if (col.label) {
          head = (typeof header[col.label] == 'object') ? header[col.label] : {};
        } else {
          head = (typeof header[k] == 'object') ? header[k] : {};
        }
        let key = head.key || '';
        if (col.type != 'hidden') {
          k++;
        }
        let cell;
        let width = cellWidth.medium, textAlign = head.align || 'center';
        if (head.width && typeof head.width == 'number') {
          width = head.width;
        } else if (head.width && typeof head.width == 'string') {
          width = cellWidth[head.width];
        }

        style = {...style, width, textAlign, paddingLeft: 5};
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
          if (formData[i] && formData[i][key] != undefined) {
            value = typeof formData[i][key] == 'number' ? String(formData[i][key]) : formData[i][key];
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
                onChange={this._onChange.bind(this, 'input', i, key, undefined)} 
                onPaste={this._onPaste.bind(this, name, i, j)}
                />
            </td>
          );
        } else if (col.type === 'select') {
          let options = filteredOptions[i][key];
          if (options && options.length > 0 && ((typeof options[0] == 'object' && options[0].value != undefined) || (typeof options[0] == 'string' && options[0] != 'No Value'))) {
            options.unshift({label: 'No Value', value: undefined});
          }
          if (col.disabled && col.disabled == true) {
            options = [];
          }
          cell = (
            <td key={j} rowSpan={col.rowspan || 1} colSpan={col.colspan || 1} style={{padding: 5}}>
              <Select options={options} 
                placeHolder={col.placeholder}
                disabled={col.disabled || false}
                value={formData[i][key] || col.value || ''} 
                onChange={this._onChange.bind(this, 'select', i, key, undefined)}
                onSearch={this._onSearch.bind(this, i, key, col.options)}
                style={style} />
            </td>
          );
        } else if (col.type === 'checkbox') {
          let value = formData[i][key];
          if (value == undefined) {
            value = col.value;
          }
          cell = (
            <td key={j} rowSpan={col.rowspan || 1} colSpan={col.colspan || 1} style={{padding: 5, textAlign: 'center'}}>
              <CheckBox 
                disabled={col.disabled || false}
                checked={value}  
                toggle={col.toggle || false} 
                onChange={this._onChange.bind(this, 'checkbox', i, key, undefined)}
                style={style}/>
            </td>
          );
        } else if (col.type === 'radio-button') {
          cell = (
            <td key={j} rowSpan={col.rowspan || 1} colSpan={col.colspan || 1} style={{padding: 5, textAlign: 'center'}}>
              <CheckBox 
                checked={formData[i][key] || false}  
                toggle={col.toggle || false} 
                onChange={this._onChange.bind(this, 'radio-button', i, key, undefined)}
                style={style}/>
            </td>
          );
        } else if (col.type === 'action') {
          if (col.value && col.value.length > 0) {
            let actions = [];
            col.value.forEach((e, l) => {
              let {action, tooltip, path, icon} = e;
              if (action == 'read') {
                icon = <ViewIcon />;
              } else if (action == 'update') {
                icon = <EditIcon />
              } else if (action == 'print') {
                icon = <PrintIcon />
              } else if (action == 'delete') {
                icon = <TrashIcon />
              }
              if (tooltip) {
                actions.push(<Box key={l}> <ButtonTooltip tooltip={tooltip}  icon={icon} onClick={this._onActionClick.bind(this, i, action, l, path)} /> </Box>);
              } else {
                actions.push(<Box key={l}> <Button icon={icon} onClick={this._onActionClick.bind(this,i, action, l, path)} /> </Box>);
              }
            });

            cell = (
              <td key={j} rowSpan={col.rowspan || 1} colSpan={col.colspan || 1} style={style}>
                <Box direction='row' justify='center' >{actions}</Box>
              </td>
            );
          }
          const actions = col.value;

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
          <thead>{head}</thead>
          <tbody>{body}</tbody>
        </table>
      </Box>
    );
  }
}

const headerType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['xsmall','small','medium','large','xlarge','xxlarge'])]),
    align: PropTypes.oneOf(['left','center','right'])
  }),
  PropTypes.node
]);

TForm.propTypes = {
  name: PropTypes.string,
  header: PropTypes.arrayOf(PropTypes.oneOfType([
    headerType,
    PropTypes.arrayOf(headerType)
  ])).isRequired,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['label','link','input','select','checkbox','radio-button','hidden','action']).isRequired,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string, 
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.shape({action: PropTypes.oneOf(['read','update','print','delete']).isRequired, tooltip: PropTypes.string, path: PropTypes.string, icon: PropTypes.node})),
      PropTypes.shape({label: PropTypes.string, value: PropTypes.oneOfType([PropTypes.string,PropTypes.number,PropTypes.bool])}),
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
  onActionClick: PropTypes.func,
  size: PropTypes.oneOf(['auto','xsmall','small','large','xlarge','xxlarge'])
};

TForm.defaultProps = {
  name: 'table1',
  dynamicRow: false,
  dynamicCol: false,
  size: 'auto'
};

const select = (store) => {
  return {form: store.form, err: store.err};
};

export default withRouter(connect(select)(TForm));

