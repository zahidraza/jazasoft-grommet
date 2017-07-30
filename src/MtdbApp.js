import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
//import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

//import Dashboard from './components/Dashboard';
import Dashboard from './components/Hello';
import Login from './components/Login';
//import Logout from './components/Logout';


const MtdbApp = ({
  appLayout,
  children,
  customReducers = {},
  customRoutes,
  history,
  restClient,
  authClient,
  title = 'Admin on REST',
  loginPage,
  logoutButton,
  initialState,
  onLogin
}) => {
  const appReducer = combineReducers({
    routing: routerReducer,
    ...customReducers
  });
  const routerHistory = history || createHistory();
  const middleware = applyMiddleware(
    promise(),
    thunk,
    //logger(),
    routerMiddleware(routerHistory)
  );
  const store = createStore(appReducer, initialState, middleware);

  //const logout = authClient ? createElement(logoutButton || Logout) : null;

  return (
    <Provider store={store}>
      <ConnectedRouter history={routerHistory}>
        <div>
          <Switch>
            <Route exact path='/' render={props => (
              !(window.sessionStorage.isLoggedIn == true || window.sessionStorage.isLoggedIn == 'true') ? (
                createElement(loginPage || Login, { location, title, onLogin }, null)
              ) : (
                <Redirect to={{
                  pathname: '/dashboard',
                  state: { from: props.location }
                }}/>
              )
            )}/>
            <Route exact path='/dashboard' render={props => (
              (window.sessionStorage.isLoggedIn == true || window.sessionStorage.isLoggedIn == 'true') ? (
                createElement(appLayout || Dashboard, { location, title }, null)
              ) : (
                <Redirect to={{
                  pathname: '/',
                  state: { from: props.location }
                }}/>
              )
            )}/> 
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

MtdbApp.propTypes = {
  appLayout: componentPropType,
  authClient: PropTypes.func,
  children: PropTypes.node,
  customReducers: PropTypes.object,
  customRoutes: PropTypes.array,
  history: PropTypes.object,
  loginPage: componentPropType,
  logoutButton: componentPropType,
  restClient: PropTypes.func,
  title: PropTypes.string.isRequired,
  initialState: PropTypes.object,
  onLogin: PropTypes.func
};

export default MtdbApp;
