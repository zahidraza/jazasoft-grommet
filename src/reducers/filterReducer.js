import { FILTER_APPLY, FILTER_CLEAR, FILTER_COUNT, SORT_APPLY, SEARCH, RANGE_CHANGE } from '../actions/filterActions';
import { LOCATION_CHANGE } from '../actions/routerAction';

const initialState = {
  filter: {},
  range: {},
  filteredTotal: 0,
  unfilteredTotal: 0,
  toggleCount: false,
  sort: {},   // {value: , direction: }
  searching: false,
  searchValue: ''
};

const handlers = { 
  [FILTER_APPLY]: (_, action) => ({filter: action.payload.filter}),
  [RANGE_CHANGE]: (_, action) => ({range: action.payload.range}),
  [FILTER_COUNT]: (_, action) => ({filteredTotal: action.payload.filteredTotal, unfilteredTotal: action.payload.unfilteredTotal, toggleCount: !_.toggleCount}),
  [SORT_APPLY]: (_, action) => ({sort: action.payload.sort}),
  [SEARCH]: (_, action) => ({searchValue: action.payload.searchValue}),
  [LOCATION_CHANGE]: (_, action) => ({searchValue: ''}),
  [FILTER_CLEAR]: (_, action) => ({filter: {}, range: {}, filteredTotal: 0, unfilteredTotal: 0})
};

export default function section (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
