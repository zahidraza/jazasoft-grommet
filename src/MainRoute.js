import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import SubRoute from './SubRoute';
import Protected from './components/Protected';

const MainRoute = ({resources = [], customRoutes = [], authenticator, ...restProps }) => {
  return (
    <Switch>
        {
          resources.map((resource, idx)=> { 
            if (idx != 0) {
              const element = () => React.createElement(SubRoute, {basePath: resource.name, routes: resource.routes, ...restProps});
              return (
                <Protected key={idx} path={`/${resource.name}`} 
                  authenticator={authenticator}
                  component={element} 
                  />
              )
            } 
          })
        }
        {
          customRoutes.map((route, idx)=> {
            return (
              <Protected exact key={idx} 
                path={`/${route.path}`} 
                authenticator={authenticator}
                component={route.component} 
                {...restProps}
                />
            )
          })
        }
        {/* Dashboard Route. Zeroth element of resorces is dashboard rute*/}
        <Route exact path='/' component={resources[0].routes[0].component} />

    </Switch>
  )
};

MainRoute.propTypes ={
  resources: PropTypes.array
};

export default MainRoute;
