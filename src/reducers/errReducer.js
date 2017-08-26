import { BAD_REQUEST, CLEAR_ERROR } from '../actions/errActions';
import { LOCATION_CHANGE } from '../actions/routerAction';

//Two Step in Authetication:
//1. Login 
//2. get Profile
const initialState = {
  show: false, //Whether to show error on bad request
  error: {}
};

const handlers = { 
  [BAD_REQUEST]: (_, action) => ({error: action.payload.error, show: true}),
  [CLEAR_ERROR]: (_, action) => ({error: {}, show: false}),
  [LOCATION_CHANGE]: (_, action) => ({error: {}, show: false})
};

export default function section (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
