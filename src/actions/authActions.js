import {AUTH_LOGIN}  from '../rest/authTypes';
import { GET_ONE, GET_LIST } from '../rest/types';

import { CLEAR_SNACKBAR } from './notificationActions';

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
    password
  };
  const options = {params};

  return (dispatch) => {
    dispatch({type: AUTH_PROGRESS});
    authClient(AUTH_LOGIN, options)
    .then(response => {
      if (response.status == 200) {
        sessionStorage.username = username;
        const resp = response.data;
        sessionStorage.accessToken = resp.access_token;
        sessionStorage.refreshToken = resp.refresh_token;
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

export const userProfile = (restClient, username) => {
  const params = {username};
  const options = {params};
  const resource = 'users/profile';
  return (dispatch) => {
    restClient(GET_LIST, resource, options, dispatch)
    .then(response => {
      console.log(response);
      if (response.status == 200) {
        sessionStorage.authenticated = true;
        const user = response.data;
        sessionStorage.name = user.name;
        sessionStorage.email = user.email;
        sessionStorage.mobile = user.mobile;
        sessionStorage.authorities = JSON.stringify(user.authorities);
        sessionStorage.permissions = JSON.stringify(user.permissions);
        sessionStorage.company = JSON.stringify(user.company);
        dispatch({type: PROFILE_SUCCESS});
        dispatch({type: AUTH_SUCCESS});
      }
    })
    .catch(error => {
      if (error.response.status == 403) {
        dispatch({type: AUTH_FAILURE, payload:{ message: 'Access Denied. Contact Administrator.'}});
        dispatch({type: CLEAR_SNACKBAR});
      } else {
        dispatch({type: AUTH_FAILURE, payload:{ message: 'Some Error occured. Try again later!'}});
      }
    });
  };
};


export const userLogout = (authClient) => {

  return (dispatch) => {
    delete sessionStorage.authenticated;
    delete sessionStorage.accessToken;
    delete sessionStorage.refreshToken;
    delete sessionStorage.name;
    delete sessionStorage.email;
    delete sessionStorage.mobile;
    delete sessionStorage.authorities;
    delete sessionStorage.permissions;

    dispatch({type: USER_LOGOUT});
  };
}

