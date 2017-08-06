import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import SubRoute from './SubRoute';

const MainRoute = ({resources = [], dashboard, ...restProps }) => {
  return (
    <Switch>
        {resources.map(resource=> 
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
        {dashboard
            ? <Route
                exact
                path='/'
                render={routeProps => React.createElement(dashboard)}    
              />
            : (resources[0] && <Route exact path='/' render={() => <Redirect to={`/${resources[0].name}`} />} />
            )
        }
    </Switch>
  )
};

MainRoute.propTypes ={
  dashboard: PropTypes.oneOfType([PropTypes.func,PropTypes.string]),
  resources: PropTypes.array
};

export default MainRoute;
