import { FORM_CHANGE, FORM_CLEAR } from '../actions/formActions';
import { LOCATION_CHANGE } from '../actions/routerAction';

const initialState = {
  formData: {},
  toggleForm: true  
};

const handlers = { 
  [FORM_CHANGE]: (_, action) => {
    let formData = _.formData;
    formData = {...formData, ...action.payload};
    return {formData, toggleForm: !_.toggleForm};
  },
  [FORM_CLEAR]: (_, action) => ({formData: {}, toggleForm: !_.toggleForm}),
  [LOCATION_CHANGE]: (_, action) => ({formData: {}, toggleForm: !_.toggleForm})
};

export default function section (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
