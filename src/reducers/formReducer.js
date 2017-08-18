import { FORM_CHANGE_BASIC, FORM_CHANGE_COLLECTION, FORM_CLEAR } from '../actions/formActions';
import { LOCATION_CHANGE } from '../actions/routerAction';

const initialState = {
  formData: {},
  collectionData: [],
  toggleForm: true  
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
  [FORM_CLEAR]: (_, action) => ({formData: {}, collectionData: [], toggleForm: !_.toggleForm}),
  [LOCATION_CHANGE]: (_, action) => ({formData: {}, collectionData: [], toggleForm: !_.toggleForm})
};

export default function section (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
