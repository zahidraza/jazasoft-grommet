import { FILTER_APPLY, FILTER_CLEAR, FILTER_COUNT } from '../actions/filterActions';
import { LOCATION_CHANGE } from '../actions/routerAction';

const initialState = {
  filter: {},
  filteredTotal: 0,
  unfilteredTotal: 0,
  toggleCount: true  // toggle only when filter count changes
};

const handlers = { 
  [FILTER_APPLY]: (_, action) => ({filter: action.payload.filter}),
  [FILTER_COUNT]: (_, action) => ({filteredTotal: action.payload.filteredTotal, unfilteredTotal: action.payload.unfilteredTotal, toggleCount: !_.toggleCount}),
  [LOCATION_CHANGE]: (_, action) => ({filter: {}, filteredTotal: 0, unfilteredTotal: 0}),
  [FILTER_CLEAR]: (_, action) => ({filter: {}, filteredTotal: 0, unfilteredTotal: 0})
};

export default function section (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
