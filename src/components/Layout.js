import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';
import MainRoute from '../MainRoute';

const Layout = ({ sidebar, resources = [], dashboard, title}) => {
  return (
    <div>
      {sidebar}
      <MainRoute resources={resources} dashboard={dashboard}/>
    </div>
  );
};

Layout.propTypes = {
  sidebar: PropTypes.element,
  resources: PropTypes.array,
  dashboard: PropTypes.element,
  title: PropTypes.string
};

export default Layout;