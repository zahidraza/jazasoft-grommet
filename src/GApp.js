import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { routerReducer, authReducer, notificationReducer, errReducer, filterReducer } from './reducers';
import logger  from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { getRoles, getMasterLinks } from './utils/utility';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Protected from './components/Protected';
import GLayout from './components/GLayout';
import App from 'grommet/components/App';


const GApp = ({
  appLayout,
  children,
  customReducers = [],
  customRoutes,
  history,
  restClient,
  authClient,
  appName = 'Sample App',
  appShortName,
  loginPage,
  initialState,
  loading,
  authenticator
}) => {
  //Props which will be passed down to all components
  const restProps = {restClient};

  const resources = React.Children.map(children, ({ props }) => props) || [];

  //constructing reducers
  const reducers = {
    routing: routerReducer,
    auth: authReducer,
    nfn: notificationReducer,
    err: errReducer,
    filter: filterReducer
  };
  resources.forEach(resource => {
    if (resource.reducer) {
      reducers[resource.name] = resource.reducer;
    }
  });
  customReducers.forEach(r => {
    reducers[r.name] = r.reducer;
  });
  const appReducer = combineReducers(reducers);
  const routerHistory = history || createHistory();
  const middleware = applyMiddleware(
    promise(),
    thunk,
    logger,
    routerMiddleware(routerHistory)
  );
  const store = createStore(appReducer, middleware);
  if (!appLayout) {
    appLayout = GLayout;
  }

  return (
    <Provider store={store}>
      <ConnectedRouter history={routerHistory}>
        <div>
          <Switch>
            <Route exact path='/login' render={(props) => (
              !authenticator.authenticate() ? (
                createElement(loginPage || Login, { appName, authClient, restClient }, null)
              ) : (
                <Redirect to={{
                  pathname: '/',
                  state: { from: props.location }
                }}/>
              )
            )}/>

            <Protected path='/' authenticator={authenticator} component={appLayout} 
              loading={loading} 
              resources={resources}
              appName={appName}
              appShortName={appShortName}
              authClient={authClient}
              {...restProps}
            /> 
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

const componentPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.string
]);

GApp.propTypes = {
  appLayout: componentPropType,
  authClient: PropTypes.func,
  children: PropTypes.node,
  customReducers: PropTypes.array,
  customRoutes: PropTypes.array,
  history: PropTypes.object,
  loginPage: componentPropType,
  restClient: PropTypes.func,
  appName: PropTypes.string.isRequired,
  appShortName: PropTypes.string.isRequired,
  initialState: PropTypes.object,
  loading: componentPropType,
  authenticator: PropTypes.object
};

export default GApp;

/*
Signature of custom reducer
[
  name: string
  reducer: func
]
*/



