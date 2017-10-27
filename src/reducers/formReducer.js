import { fromJS } from 'immutable';
import { FORM_CHANGE_BASIC, FORM_CHANGE_COLLECTION, FORM_CLEAR, OPERATION_COMPLETED, TILE_FORM_CHANGE } from '../actions/formActions';
import { LOCATION_CHANGE } from '../actions/routerAction';

const initialState = {
  formData: {},
  collectionData: [],
  tileData: fromJS([]),
  toggleForm: true,
  opCompleted: false  //Whether Ongoing Operation completed or not
};

const handlers = { 
  [FORM_CHANGE_BASIC]: (_, action) => {
    let formData = _.formData;
    formData = {...formData, ...action.payload};
    return {formData, toggleForm: !_.toggleForm};
  },
  [FORM_CHANGE_COLLECTION]: (_, action) => {
    let collectionData = [..._.collectionData];
    collectionData[action.payload.row] = action.payload.collection;
    return {collectionData, toggleForm: !_.toggleForm};
  },
  [TILE_FORM_CHANGE]: (_, action) => ({tileData: action.payload.data, toggleForm: !_.toggleForm}),
  [FORM_CLEAR]: (_, action) => ({formData: {}, collectionData: [], toggleForm: !_.toggleForm}),
  [OPERATION_COMPLETED]: (_, action) => ({formData: {}, collectionData: [], tileData: fromJS([]), opCompleted: true}),
  [LOCATION_CHANGE]: (_, action) => ({formData: {}, collectionData: [], tileData: fromJS([]), toggleForm: !_.toggleForm, opCompleted: false})
};

export default function section (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
