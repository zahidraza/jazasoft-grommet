import React, { Component } from 'react';
import {connect} from 'react-redux';

import {CLEAR_SNACKBAR} from '../actions/notificationActions';

import Snackbar from 'react-toolbox/lib/snackbar';

class TSnackbar extends Component {

  constructor () {
    super();
    this.state = {
      active: false,
      message: '',
      duration: 'short'
    };
    this.clearSnackbar = this.clearSnackbar.bind(this);
  }
   
  componentWillReceiveProps(nextProps) {
    if (nextProps.nfn.showSnackbar) {
      const { snackbar } = nextProps.nfn;
      let duration = 'short';
      if (snackbar.duration && snackbar.duration == 'long') {
        duration = 'long';
      }
      this.setState({active: true, message: snackbar.message, duration});
    } else {
      this.setState({active: false});
    }
  }
  
  clearSnackbar () {
    this.props.dispatch({type: CLEAR_SNACKBAR});
  }

  render() {
    const { active, message, duration } = this.state;
    const timeout = (duration == 'short') ? 2000 : 5000;
    return (
      <Snackbar
          action='Dismiss'
          active={active}
          label={message}
          timeout={timeout}
          onClick={this.clearSnackbar}
          onTimeout={this.clearSnackbar}
          type='cancel'
        />
    );
  }
}

const select = (store) => ({nfn: store.nfn});

export default connect(select)(TSnackbar);