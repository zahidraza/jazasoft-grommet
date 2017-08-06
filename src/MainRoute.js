import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import SubRoute from './SubRoute';

const MainRoute = ({resources = [], ...restProps }) => {
  return (
    <Switch>
        {
          resources.map((resource, idx)=> { 
            if (idx != 0) {
              return (
                <Route 
                  path={`/${resource.name}`} 
                  key={resource.name} 
                  render={()=>
                    <SubRoute 
                      {...restProps}
                      basePath={resource.name}
                      routes={resource.routes}
                    />
                  }
                />
              )
            } 
          })
        }
        <Route exact path='/' component={resources[0].routes[0].component} />

    </Switch>
  )
};

MainRoute.propTypes ={
  resources: PropTypes.array
};

export default MainRoute;
