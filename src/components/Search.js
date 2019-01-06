import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FORM_CHANGE } from '../actions/formActions';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Select from 'grommet/components/Select';
import DateTime from 'grommet/components/DateTime';
import FormField from 'grommet/components/FormField';
import Title from 'grommet/components/Title';
import FilterIcon from 'grommet/components/icons/base/Filter';
import { denormalise } from '../utils/utility';

const getOptions = (props, element, searchValue) => {
  const { resource, cbMap, cbFlatMap } = element;
  let options =
    (props[resource] && denormalise(props[resource][`${resource}s`])) || [];
  if (cbFlatMap) {
    options = options.flatMap(cbFlatMap);
  }
  if (cbMap) {
    options = options.map(cbMap);
  }
  if (searchValue) {
    options = options.filter(e => {
      let result;
      if (typeof e === 'string') {
        result = e.toLowerCase().includes(searchValue.toLowerCase());
      } else if (typeof e === 'object') {
        result = e.label.toLowerCase().includes(searchValue.toLowerCase());
      }
      return result;
    });
  }
  return options;
};

class Search extends Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
    this._onSearch = this._onSearch.bind(this);

    this.state = {
      filteredOptions: {},
      searchValue: {}
    };
  }

  componentWillMount() {
    const { data } = this.props;
    if (data && data.length > 0) {
      this.props.dispatch({
        type: FORM_CHANGE,
        payload: {
          data: data.reduce((acc, el) => ({ ...acc, [el.name]: el.value }), {})
        }
      });
    }
  }

  _onChange(type, key, event) {
    let value;
    if (type == 'select') {
      value = event.value;
    } else if (type == 'date') {
      value = new Date(event);
    }

    this.props.dispatch({ type: FORM_CHANGE, payload: { key, value } });
    if (this.props.onChange) {
      this.props.onChange(type, key, event.value);
    }
  }

  _onSearch(key, options, event) {
    let { searchValue } = this.state;
    searchValue[key] = event.target.value;
    this.setState({ searchValue });
    if (this.props.onSearch) {
      this.props.onSearch(key, event.target.value);
    }
  }

  render() {
    const { searchValue } = this.state;
    const {
      title,
      data,
      form: { formData },
      dispatch,
      filter,
      onFilter,
      onSearch,
      ...restProps
    } = this.props;

    const titleItem = title && (
      <Box alignSelf='center'>
        <Title>
          <Heading tag='h3'> {title}</Heading>
        </Title>
      </Box>
    );

    let content;
    if (data && data.length > 0) {
      content = data.map((e, i) => {
        let result;
        const size = e.width || 'medium';
        if (e.type == 'select') {
          let options = [];
          if (e.resource) {
            options = getOptions(this.props, e, searchValue[e.name]);
          }
          result = (
            <Box key={i} size={size}>
              <Select
                options={options}
                placeHolder={e.placeholder}
                value={formData[e.name] || e.value || ''}
                onChange={this._onChange.bind(this, e.type, e.name)}
                onSearch={this._onSearch.bind(this, e.name, e.options)}
              />
            </Box>
          );
        } else if (e.type == 'date') {
          result = (
            <Box
              key={i}
              direction='row'
              pad={{ between: 'small', horizontal: 'small' }}
            >
              <Box alignSelf='center' alignContent='center'>
                <Title>
                  <Heading tag='h4'> {e.placeholder}</Heading>
                </Title>
              </Box>
              <Box alignSelf='center'>
                <FormField>
                  <DateTime
                    format='MM/DD/YYYY'
                    value={formData[e.name] || e.value || ''}
                    onChange={this._onChange.bind(this, e.type, e.name)}
                  />
                </FormField>
              </Box>
            </Box>
          );
        }
        return result;
      });
    }

    return (
      <Header justify='between' pad={{ horizontal: 'medium' }} {...restProps}>
        {titleItem}
        <Box direction='row'>
          {content}
          {filter && (
            <Box alignSelf='center'>
              {' '}
              <FilterIcon onClick={onFilter} />{' '}
            </Box>
          )}
        </Box>
      </Header>
    );
  }
}

Search.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, //Key with which data will store in formReducer
      type: PropTypes.oneOf(['select', 'date']).isRequired,
      width: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'full']),
      placeholder: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string.isRequired,
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
              .isRequired
          })
        ])
      ),
      resource: PropTypes.string,
      dataKey: PropTypes.oneOf([PropTypes.string, PropTypes.func])
    })
  ),
  filter: PropTypes.bool,
  onFilter: PropTypes.func,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  ...Box.propTypes
};

Search.defaultProps = {
  size: 'large',
  filter: false
};

const select = (state, props) => {
  let resources = [];
  if (props.data) {
    props.data.forEach(e => {
      if (e.resource) {
        resources.push(e.resource);
      }
    });
  }
  const data = resources.reduce(
    (acc, resource) => ({ ...acc, [resource]: state[resource] }),
    {}
  );
  return { form: state.form, ...data };
};

export default connect(select)(Search);
