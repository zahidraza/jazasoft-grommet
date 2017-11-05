import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {FORM_CHANGE} from '../actions/formActions';

import Box from 'grommet/components/Box';
import CaretUpIcon from 'grommet/components/icons/base/Up';
import CaretDownIcon from 'grommet/components/icons/base/Down';
import Button from 'grommet/components/Button';
import Select from 'grommet/components/Select';
import ClearOptionIcon from 'grommet/components/icons/base/ClearOption';
import TooltipButton from './TooltipButton';

/**
 * Collapsable Tile
 */
class CTile extends Component {

  constructor () {
    super();
    this._onClearOptions = this._onClearOptions.bind(this);
    this._toggleCollapse = this._toggleCollapse.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._onChange = this._onChange.bind(this);

    this.state = {
      collapsed: false,
      filteredOptions: []
    };
  }

  componentWillMount() {
    const {collapsed, options} = this.props;
    this.setState({collapsed, filteredOptions: options});
  }

  _onClearOptions (name, event) {
    this.props.dispatch({type: FORM_CHANGE, payload: {key: name, value: undefined}});
    if (this.props.onClear) {
      this.props.onClear(name, event);
    }
  }
  
  _toggleCollapse () {
    this.setState({collapsed: !this.state.collapsed});
  }

  _onSearch (event) {
    const value = event.target.value;
    const filteredOptions = this.props.options.filter(e => {
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
    this.setState({filteredOptions});
  }

  _onChange (name, event) {
    this.props.dispatch({type: FORM_CHANGE, payload: {key: name, value: event.value}});
    if (this.props.onChange) {
      this.props.onChange(name, event.value);
    }
  }

  render() {
    const {heading, options, name, placeholder, value, form: { formData}} = this.props;

    const icon = this.state.collapsed ? <TooltipButton tooltip='Expand' icon={<CaretDownIcon colorIndex='light-1'/>} onClick={this._toggleCollapse} /> : <TooltipButton tooltip='Collapse' icon={<CaretUpIcon colorIndex='light-1'/>} onClick={this._toggleCollapse} />;
    const content = this.state.collapsed ? null : this.props.children;

    return (
      <Box colorIndex='light-2'>
        
        <Box colorIndex='unknown' direction='row' pad='none' justify='between' >
          <Box pad={{horizontal: 'small'}} alignSelf='center'> {heading}</Box>

          <Box direction='row' justify='end' pad={{between: 'small'}}>
            {options && 
            <Box alignSelf='center' >
              <TooltipButton tooltip='Clear Option' icon={<ClearOptionIcon colorIndex='light-1' />}  onClick={this._onClearOptions.bind(this, name)} />
            </Box>
            }
            {options && 
            <Box colorIndex='light-1' alignSelf='center' size='medium'>
              <Select placeHolder={placeholder}
                onSearch={this._onSearch}
                options={this.state.filteredOptions}
                value={formData[name] || value || ''}
                onChange={this._onChange.bind(this, name)} />
            </Box>
            }
            <Box alignSelf='center'>{icon}</Box>
          </Box>
        </Box>
        <Box pad={{horizontal: 'small'}}>
          {content} 
        </Box>       
      </Box>
    );
  }
}

CTile.propTypes = {
  heading: PropTypes.string.isRequired,
  collapsed: PropTypes.bool,


  options: PropTypes.array,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func
};

CTile.defaultProps = {
  collapsed: false,
  name: 'heading',
  placeholder: 'Select'
};

const select = (store) => ({form: store.form, error: store.error});

export default connect(select)(CTile);