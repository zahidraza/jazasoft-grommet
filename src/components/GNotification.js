import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {CLEAR_NOTIFICATION} from '../actions/notificationActions';

import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import Notification from 'grommet/components/Notification';
import Dailog from './Dailog';
import TForm from './form/TForm';

const errorItem = (errors) => {
  let errorItem;
  if (errors) {
    const isCollection = errors.find(e => e.row != undefined) != undefined;
    if (isCollection) {
      const  data = errors.map(e => {
        return [{type: 'label', value: 'Row ' + e.row}, {type: 'label', value: e.message}];
      });
      errorItem = (
        <TForm id='markerTable'
          header={[{label: 'Row', align: 'left', width: 150},{label: 'Error', width: 450, align: 'left'}]} 
          data={data}  
          />
      );
    } else {
      const  data = errors.map(e => {
        return [{type: 'label', value: e.message}];
      });
      errorItem = (
        <TForm id='markerTable'
          header={[{label: 'Error', align: 'left', width: 600}]}
          data={data}  
          />
      );
    }
  }
  return errorItem;
};

class GNotification extends Component {

  constructor () {
    super();
    this.state = {
      hidden: true,
      message: undefined,
      errors: undefined,
      errorMap: undefined,
      status: 'unknown',
      key: 1
    };

    this.clearNotification = this.clearNotification.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nfn.showNotification) {
      const nfn  = nextProps.nfn.notification;
      let status = 'unknown';
      if (nfn.status) {
        status = nfn.status;
      }
      this.setState({hidden: false, status, message: nfn.message, errors: nfn.errors, errorMap: nfn.errorMap, key: this.state.key+1});
    } else {
      this.setState({hidden: true, key: this.state.key+1});
    }
  }

  clearNotification () {
    this.props.dispatch({type: CLEAR_NOTIFICATION});
  }

  render() {
    const { hidden, message, errors, errorMap, status, key} = this.state;
    let content;
    if (message) {
      content = (
        <Layer hidden={hidden} closer={true} onClose={this.clearNotification} >
          <Notification 
            margin={{horizontal: 'none', vertical: 'large'}}
            size='medium'
            message={message}
            status={status}
          />
        </Layer>
      );
    } else if (errors) {
      content = (
        <Dailog key={key}
          active={!hidden}
          title='Error(s)'
          onCancel={this.clearNotification}
          size='large'
          height={200}  
        >
          {errorItem(errors)}
        </Dailog>
      );
    } else if (errorMap) {
      let items = [];
      Object.keys(errorMap).forEach(key => {
        if (errorMap[key].length > 0) {
          items.push(
            <Box key={key}>
              <Box><b>{key}:</b></Box>
              <Box >{errorItem(errorMap[key])}</Box>
            </Box>
          );
        }
      });
      content = (
        <Dailog key={key}
          active={!hidden}
          title='Error(s)'
          onCancel={this.clearNotification}
          size='large'
          height={300}  
        >
          {items}
        </Dailog>
      );
    } else {
      content = (<div/>);
    }
    return content;
  }
}

const select = (store) => ({nfn: store.nfn});

export default connect(select)(GNotification);
