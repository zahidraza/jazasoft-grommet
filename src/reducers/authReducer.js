import { AUTH_PROGRESS,LOGIN_SUCCESS, PROFILE_SUCCESS, AUTH_SUCCESS, AUTH_FAILURE, USER_LOGOUT} from '../actions/authActions';

//Two Step in Authetication:
//1. Login 
//2. get Profile
const initialState = {
  authProgress: false,
  loginSuccess: false,
  profileSuccess: false,
  authenticated: false,
  message: ''
};

const handlers = { 
  [AUTH_PROGRESS]: (_, action) => ({authProgress: true}),
  [LOGIN_SUCCESS]: (_, action) => ({loginSuccess: true}),
  [PROFILE_SUCCESS]: (_, action) => ({profileSuccess: true}),
  [AUTH_SUCCESS]: (_, action) => ({authProgress: false, loginSuccess: false, profileSuccess: false, message: '', authenticated: true}),
  [AUTH_FAILURE]: (_, action) => ({authProgress: false, authenticated: false, message: action.payload.message}),
  [USER_LOGOUT]: (_, action) => ({authProgress: false, authenticated: false})
};

export default function section (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
