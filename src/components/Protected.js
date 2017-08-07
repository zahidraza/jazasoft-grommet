import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class Protected extends Component {

  render() {
    const { authenticator, path, exact, component, ...restProps } = this.props;
    const ex = (exact == undefined) ? false : exact;
    return (
      <Route exact={ex} path={path} render={(props) => {
        let result;
        if (authenticator.authenticate()) {
          if (authenticator.authorize(path)) {
            result = (React.createElement(component, { authenticator, ...props, ...restProps }));
          } else {
            result = (<Redirect to='/' />);
          }
        } else {
          result = (<Redirect to='/login' />);
        }
        return result;
      }} />
    );
  }
}

Protected.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func,PropTypes.string]).isRequired,
  authenticator: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
};

export default Protected;