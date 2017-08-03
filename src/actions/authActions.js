import {AUTH_LOGIN}  from '../rest/authTypes';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_LOADING = 'USER_LOGIN_LOADING';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

export const userLogin = (authClient, username, password) => {
  const params = {
    grant_type: 'password',
    username,
    password
  };

  return (dispatch) => {
    
    authClient(AUTH_LOGIN, params)
    .then(response => {
      console.log(response);
    });
  };

};

