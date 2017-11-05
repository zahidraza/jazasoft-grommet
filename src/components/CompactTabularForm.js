import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { fromJS } from 'immutable';

import {CT_FORM_CHANGE} from '../actions/formActions';

import Box from 'grommet/components/Box';
import CaretUpIcon from 'grommet/components/icons/base/Up';
import CaretDownIcon from 'grommet/components/icons/base/Down';
import TooltipButton from './TooltipButton';
import AddIcon from 'grommet/components/icons/base/Add';

class CompactTabularForm extends Component {

  constructor () {
    super();
    this._toggleCollapse = this._toggleCollapse.bind(this);
    this._onAddColumn = this._onAddColumn.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state = {
      collapsed: false,
      rowLabels: fromJS([]),
      colLabels: fromJS([]),
      col: 0,
      row: 0
    }
  }

  
  componentWillMount() {
    let {collapsed, row, col, isRowDynamic, isColDynamic, rowLabels, colLabels, rowLabelPrefix, colLabelPrefix} = this.props;
    if (rowLabels == undefined) {
      rowLabels = [];
      for (let i = 0; i < row; i++) {
        rowLabels[i] = rowLabelPrefix + ' ' + (i+1);
      }
    }
    if (colLabels == undefined) {
      colLabels = [];
      for (let i = 0; i < col; i++) {
        colLabels[i] = colLabelPrefix + ' ' + (i+1);
      }
    }
    const rows = isColDynamic ? rowLabels.length + 1 : rowLabels.length;
    const cols = isRowDynamic ? colLabels.length + 1 : colLabels.length;
    let ctFormData = new Array(rows).fill('').map(r => new Array(cols).fill(''));

    rowLabels = fromJS(rowLabels);
    colLabels = fromJS(colLabels);
    this.setState({collapsed, rowLabels, colLabels, row, col});
    this.props.dispatch({type: CT_FORM_CHANGE, payload: {data: ctFormData}});
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.rowLabels.size != nextProps.rowLabels.length) {
      this.setState({rowLabels: fromJS(nextProps.rowLabels)});
      let {ctFormData} = this.props.form;
      ctFormData.push(new Array(this.state.col).fill(''));
      this.props.dispatch({type: CT_FORM_CHANGE, payload: {data: ctFormData}});
    }
  }
  
  _toggleCollapse () {
    this.setState({collapsed: !this.state.collapsed});
  }

  _onAddColumn () {
    
    let {col} = this.state;
    col = col + 1;
    let colLabels = [];
    for (let i = 0; i < col; i++) {
      colLabels[i] = this.props.colLabelPrefix + ' ' + (i+1);
    }
    let {ctFormData} = this.props.form;
    this.props.dispatch({type: CT_FORM_CHANGE, payload: {data: ctFormData}});
  }

  _onChange (row, col, event) {
    let {form: {ctFormData}} = this.props;
    ctFormData[row][col] = event.target.value;
    this.props.dispatch({type: CT_FORM_CHANGE, payload: {data: ctFormData}});
  }

  render() {
    let {rowLabels, colLabels, collapsed} = this.state;
    const {headerLabel, isRowDynamic, isColDynamic, form: {ctFormData}} = this.props;

    if (isRowDynamic) {
      colLabels = colLabels.unshift('');
    }

    if (isColDynamic) {
      rowLabels = rowLabels.unshift('');
    }
    rowLabels = rowLabels.toJS();
    colLabels = colLabels.toJS();

    const inputStyle = {
      padding: 0,
      margin: 3,
      width: 100,
      textAlign: 'center',
      background: '#fff'
    };
    
    let rows = [];
    for (let i = 0; i <= rowLabels.length; i++) {
      let cols = [];
      for (let j = 0; j <= colLabels.length; j++) {
        if (i == 0 && j == 0) {
          cols[j] = (<td key={j}></td>);
          cols[colLabels.length+1] = (<td key={colLabels.length+1}><AddIcon size='xsmall' onClick={this._onAddColumn}/></td>);
        }
        if (i == 0 && j != 0) {
          cols[j] = (<td key={j} style={{textAlign: 'center'}}>{colLabels[j-1]}</td>);
        }
        if (i != 0 && j == 0) {
          cols[j] = (<td key={j} style={{paddingRight: 20}}>{rowLabels[i-1]}</td>);
        }
        if (i != 0 && j != 0) {
          const value = ctFormData[i-1] == undefined ? '' : (ctFormData[i-1][j-1] == undefined ? '' : ctFormData[i-1][j-1]);
          cols[j] = (<td key={j}><input style={inputStyle}  type='text' value={value} onChange={this._onChange.bind(this, (i-1),(j-1))}/></td>);
        }
        if (isRowDynamic && isColDynamic && i == 1 && j == 1) {
          cols[j] = (<td key={j}></td>);
        }
      }

      rows[i] = (
        <tr key={i}>
          {cols}
        </tr>
      );
    }

    let content;
    if (!collapsed) {
      content = (
        <Box pad={{horizontal: 'medium', vertical: 'medium'}}>
          <table>
            <tbody>
              {rows}
            </tbody>
          </table>
        </Box>
      );
    }

    const icon = collapsed ? <TooltipButton tooltip='Expand' icon={<CaretDownIcon colorIndex='light-1'/>} onClick={this._toggleCollapse} /> : <TooltipButton tooltip='Collapse' icon={<CaretUpIcon colorIndex='light-1'/>} onClick={this._toggleCollapse} />;

    return (
      <Box colorIndex='light-2'>
        <Box colorIndex='unknown' direction='row' pad='none' justify='between' >
          <Box pad={{horizontal: 'small'}} alignSelf='center'> {headerLabel}</Box>
          <Box alignSelf='center'>{icon}</Box>
        </Box>
          
        {content}

      </Box>
    );
  }
}

CompactTabularForm.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  isRowDynamic: PropTypes.bool,
  isColDynamic: PropTypes.bool,
  rowLabelPrefix: PropTypes.string,
  colLabelPrefix: PropTypes.string,
  rowLabels: PropTypes.array,
  colLabels: PropTypes.array,
  headerLabel: PropTypes.string,
  headerName: PropTypes.string,
  collapsed: PropTypes.bool,
  addColumn: PropTypes.func
};

CompactTabularForm.defaultProps = {
  row: 3,
  col: 5,
  isRowDynamic: false,
  isColDynamic: false,
  rowLabelPrefix: 'Row',
  colLabelPrefix: 'Col',
  collapsed: false
};

const select = (store) => {
  return {form: store.form, err: store.err};
};

export default connect(select)(CompactTabularForm);