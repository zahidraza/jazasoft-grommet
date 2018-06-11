import {AUTH_LOGIN, AUTH_PROFILE, CUSTOM}  from '../rest/authTypes';
import { GET_ONE, GET_LIST } from '../rest/types';

import { SHOW_NOTIFICATION, SHOW_SNACKBAR } from './notificationActions';

export const USER_LOGIN = 'USER_LOGIN';
export const AUTH_PROGRESS = 'AUTH_PROGRESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogin = (authClient, username, password) => {
  const params = {
    grant_type: 'password',
    username,
    password,
    appId: 'optacut'
  };
  const options = {params};

  return (dispatch) => {
    dispatch({type: AUTH_PROGRESS});
    authClient(AUTH_LOGIN, options)
    .then(response => {
      if (response.status == 200) {
        localStorage.username = username;
        const resp = response.data;
        Object.keys(resp).forEach(key => {
          localStorage[key] = typeof resp[key] === 'object' ? JSON.stringify(resp[key]) : resp[key];
        });
        dispatch({type: LOGIN_SUCCESS});
      }
    })
    .catch(error => {
      if (error.response.status == 400) {
        dispatch({type: AUTH_FAILURE, payload:{ message: 'Incorrect Username or password. Try again!'}});
      } else {
        dispatch({type: AUTH_FAILURE, payload:{ message: 'Some Error occured. Try again later!'}});
      }
    });
  };
};

export const userProfile = (authClient) => {
  return (dispatch) => {
    authClient(AUTH_PROFILE, {})
    .then(response => {
      console.log(response);
      if (response.status == 200) {
        localStorage.authenticated = true;
        const {id, firstName, lastName, username, email, mobile, authorities, roleList, resources} = response.data;
        const user = {userId: id, firstName, lastName, username, email, mobile};

        Object.keys(user).forEach(key => {
          localStorage[key] = user[key];
        });
        localStorage.authorities = JSON.stringify(authorities);
        localStorage.roleList = roleList.map(r => r.desc).join(', ');
        localStorage.loggedInNow = 'true';
        dispatch({type: PROFILE_SUCCESS});
        dispatch({type: AUTH_SUCCESS});
      }
    })
    .catch(error => {
      console.log(error);
      if (error.response && error.response.status == 403) {
        console.log(error.response);
        const resp = error.response;
        if (resp && resp.data && (resp.data.status == 'PRODUCT_LICENSE_NOT_ACTIVATED' || resp.data.status == 'PRODUCT_LICENSE_EXPIRED')) {
          dispatch({type: SHOW_NOTIFICATION, payload: {nfn: {message: resp.data.message, status: 'warning'}}});
          dispatch({type: AUTH_FAILURE, payload:{ message: ''}});
        } else {
          dispatch({type: AUTH_FAILURE, payload:{ message: 'Access Denied. Contact Administrator.'}});
        }
      } else {
        dispatch({type: AUTH_FAILURE, payload:{ message: 'Some Error occured. Try again later!'}});
      }
    });
  };
};

export const resetPassword = (authClient, username) => {
  const options = {
    url: 'api/users/forgotPassword',
    method: 'PATCH',
    params: {username},
    headers: {}
  };
  return (dispatch) => {
    dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'Please wait...'}}});
    authClient(CUSTOM, options)
    .then(response => {
      console.log(response);
      if (response.status == 200 && response.data && response.data.message) {
        dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: response.data.message}}});
      }
    })
    .catch(error => {
      console.log(error);
      if (error.response && error.response.status == 404) {
        dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'User Not Found.'}}});
      }
    });
  };
};


export const userLogout = (authClient) => {

  return (dispatch) => {
    delete localStorage.authenticated;
    delete localStorage.accessToken;
    delete localStorage.refreshToken;
    delete localStorage.userId;
    delete localStorage.firstName;
    delete localStorage.lastName;
    delete localStorage.email;
    delete localStorage.mobile;
    delete localStorage.authorities;

    dispatch({type: USER_LOGOUT});
  };
}

