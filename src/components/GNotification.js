import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {CLEAR_NOTIFICATION} from '../actions/notificationActions';

import Layer from 'grommet/components/Layer';
import Notification from 'grommet/components/Notification';

class GNotification extends Component {

  constructor () {
    super();
    this.state = {
      hidden: true,
      message: '',
      status: 'unknown'
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
      this.setState({hidden: false, message: nfn.message, status});
    } else {
      this.setState({hidden: true});
    }
  }

  clearNotification () {
    this.props.dispatch({type: CLEAR_NOTIFICATION});
  }

  render() {
    const { hidden, message, status} = this.state;
    return (
      <Layer hidden={hidden} closer={true} onClose={this.clearNotification} >
        <Notification 
          margin={{horizontal: 'none', vertical: 'large'}}
          size='medium'
          message={message}
          status={status}
        />
      </Layer>
    );
  }
}

const select = (store) => ({nfn: store.nfn});

export default connect(select)(GNotification);
