import { FILTER_APPLY, FILTER_CLEAR, FILTER_COUNT, SORT_APPLY, SEARCH, RANGE_CHANGE, PAGE_CHANGE } from '../actions/filterActions';
import { LOCATION_CHANGE } from '../actions/routerAction';
import cloneDeep from 'lodash/cloneDeep';

const initialState = {
  filter: {},
  range: {},
  filteredTotal: 0,
  unfilteredTotal: 0,
  toggleCount: false,
  sort: {},   // {value: , direction: }
  searching: false,
  searchValue: '',
  version: 0,
  page: 0,
};

const handlers = { 
  [PAGE_CHANGE]: (_, action) => ({page: _.page + 1}),
  [FILTER_APPLY]: (_, action) => {
    return {filter: cloneDeep(action.payload.filter), version: _.version+1};
  },
  [RANGE_CHANGE]: (_, action) => ({range: action.payload.range, version: _.version+1}),
  [FILTER_COUNT]: (_, action) => ({filteredTotal: action.payload.filteredTotal, unfilteredTotal: action.payload.unfilteredTotal, toggleCount: !_.toggleCount, version: _.version+1}),
  [SORT_APPLY]: (_, action) => ({sort: action.payload.sort, version: _.version+1}),
  [SEARCH]: (_, action) => ({searchValue: action.payload.searchValue, version: _.version+1}),
  [LOCATION_CHANGE]: (_, action) => ({searchValue: '', page: 0, version: 0}),
  [FILTER_CLEAR]: (_, action) => {
    let filter = _.filter;
    if (action.payload && action.payload.keys && action.payload.keys instanceof Array && filter) {
      action.payload.keys.forEach(key => {
        delete filter[key];
      })
    } else {
      filter = {};
    }
    return {filter, range: {}, version: _.version+1};
  }
};

export default function section (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
