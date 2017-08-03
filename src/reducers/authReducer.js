import { AUTH_PROGRESS, AUTH_SUCCESS, AUTH_FAILURE, USER_LOGOUT} from '../actions/authActions';

const initialState = {
  authProgress: false,
  authenticated: false
};

const handlers = { 
  [AUTH_PROGRESS]: (_, action) => ({authProgress: true}),
  [AUTH_SUCCESS]: (_, action) => ({authProgress: false, authenticated: true}),
  [AUTH_FAILURE]: (_, action) => ({authProgress: false, authenticated: false}),
  [USER_LOGOUT]: (_, action) => ({authProgress: false, authenticated: false})
};

export default function section (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
