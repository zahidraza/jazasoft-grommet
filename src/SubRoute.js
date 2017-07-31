import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

const SubRoute = ({ basePath, routes = []}) => { 
  const items = routes.map((route, index) => {
    const path = `/${basePath}/${route.path}`;
    return (
      <Route exact key={path} path={path} component={route.component}/>
    );
  })
  return (
      <Switch>
          {items}
      </Switch>
  );
};

SubRoute.prototype = {
  basePath: PropTypes.string.isRequired,
  routes: PropTypes.array
};

export default SubRoute;
