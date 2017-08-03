import {AUTH_LOGIN}  from '../rest/authTypes';

export const USER_LOGIN = 'USER_LOGIN';
export const AUTH_PROGRESS = 'AUTH_PROGRESS';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogin = (authClient, username, password) => {
  const params = {
    grant_type: 'password',
    username,
    password
  };

  return (dispatch) => {
    dispatch({type: AUTH_PROGRESS});
    authClient(AUTH_LOGIN, params)
    .then(response => {
      if (response.status == 200) {
        sessionStorage.authenticated = true;
        sessionStorage.username = username;
        const resp = response.json;
        sessionStorage.accessToken = resp.access_token;
        sessionStorage.refreshToken = resp.refresh_token;
        
        dispatch({type: AUTH_SUCCESS});
      }
    });
  };
};

export const userLogout = (authClient) => {

  return (dispatch) => {
    delete sessionStorage.authenticated;
    delete sessionStorage.accessToken;
    delete sessionStorage.refreshToken;
    dispatch({type: USER_LOGOUT});
    // authClient(AUTH_LOGIN, params)
    // .then(response => {
    //   if (response.status == 200) {
    //     sessionStorage.authenticated = true;
    //     sessionStorage.username = username;
    //     const resp = response.json;
    //     sessionStorage.accessToken = resp.access_token;
    //     sessionStorage.refreshToken = resp.refresh_token;
        
    //     dispatch({type: AUTH_SUCCESS});
    //   }
    // });
  };
}

