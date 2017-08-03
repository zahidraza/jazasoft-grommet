import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

const SubRoute = ({ basePath, routes = [], ...restProps}) => { 
  const items = routes.map((route, index) => {
    const path = `/${basePath}/${route.path}`;
    return (
      <Route exact key={path} path={path} 
        render={(props)=> React.createElement(route.component, {...props, ...restProps})}
      />
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
