import { fromJS } from 'immutable';
import { FORM_CHANGE_BASIC, FORM_CHANGE, TABLE_FORM_CHANGE, FORM_CHANGE_COLLECTION, FORM_CLEAR, OPERATION_COMPLETED, TILE_FORM_CHANGE, CT_FORM_CHANGE } from '../actions/formActions';
import { LOCATION_CHANGE } from '../actions/routerAction';

const initialState = {
  formData: {},
  tableData: {},
  collectionData: [],
  tileData: fromJS([]),
  ctFormData: [[]],
  toggleForm: true,
  opCompleted: false  //Whether Ongoing Operation completed or not
};

const handlers = { 
  [FORM_CHANGE]: (_, action) => {
    let formData = _.formData;
    const {name, key, value, data} = action.payload;
    if (name) {
      if (data) {
        formData[name] = {...data};
      } else {
        let tmp = formData[name] || {};
        tmp[key] = value;
        formData[name] = tmp;
      }

    } else {
      if (data) {
        formData = {...formData, ...data};
      } else {
        formData[key] = value;
      }
    }
    return {formData, toggleForm: !_.toggleForm};
  },
  [TABLE_FORM_CHANGE]: (_, action) => {
    //To change one cell value: (name, row, key, value)
    //To change one row value: (name, row, rowData)
    //To change entire value: (name, data)
    let tableData = _.tableData;
    const {name, row, key, value, data, rowData} = action.payload;
    let tmp = tableData[name];
    if (data) {
      tmp = data;
    } else if (rowData) {
      tmp[row] = {...rowData};
    } else {
      tmp[row][key] = value;
    }
    tableData[name] = tmp;
    return {tableData, toggleForm: !_.toggleForm};
  },
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
  [CT_FORM_CHANGE]: (_, action) => ({ctFormData: action.payload.data, toggleForm: !_.toggleForm}),
  [FORM_CLEAR]: (_, action) => ({formData: {}, collectionData: [], toggleForm: !_.toggleForm}),
  [OPERATION_COMPLETED]: (_, action) => ({formData: {}, collectionData: [], tileData: fromJS([]), ctFormData: [[]], opCompleted: true}),
  [LOCATION_CHANGE]: (_, action) => ({formData: {}, tableData: {}, collectionData: [], tileData: fromJS([]), ctFormData: [[]],  toggleForm: !_.toggleForm, opCompleted: false})
};

export default function section (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
