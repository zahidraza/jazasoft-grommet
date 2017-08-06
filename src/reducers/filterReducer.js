import { APPLY_FILTER, CLEAR_FILTER } from '../actions/filterActions';

const initialState = {
  filter: {}
};

const handlers = { 
  [APPLY_FILTER]: (_, action) => ({filter: action.payload.filter}),
  [CLEAR_FILTER]: (_, action) => ({filter: {}})
};

export default function section (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
