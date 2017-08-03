import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const Protected = ({ isAuth, component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return isAuth() ? (React.createElement(component, { ...props, ...rest })) : (<Redirect to='/login' />);
  }} />
);

Protected.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  isAuth: PropTypes.func.isRequired,
};

export default Protected;