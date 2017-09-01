import { BAD_REQUEST } from '../actions/errActions';
import { SHOW_SNACKBAR } from '../actions/notificationActions';

export const STRING = 'STRING';
export const NUMBER = 'NUMBER';
export const DATE = 'DATE';
export const EMAIL = 'EMAIL';

//Return true if no errors, false if some errors
//Is data valid ?  true : if no errors, false: if any errors
export function validate (dispatch, objectData, arrayData) {
  let error = {};
  let errors = [];
  let collectionError = false;
  if (objectData) {
    objectData.forEach(e => {
      error = validateItem(e, error);
    });
  }
  if (arrayData) {
    arrayData.forEach((e, idx) => {
      e.forEach((el => {
        if (!errors[idx]) errors[idx] = {};
        errors[idx] = validateItem(el, errors[idx])
      }));
      if (Object.keys(errors[idx]).length != 0) {
        collectionError = true;
      }
    });
  }
  if (Object.keys(error).length != 0 || collectionError) {
    dispatch({type: BAD_REQUEST, payload: { error, errors }});
    dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'Rectify errors and submit again.'}}});
    return false;
  }
  return true;
}

function validateItem (item, errors) {
  switch (item.type) {
  case STRING:
    if (item.optional == undefined || item.optional == false) {
      if (typeof item.value === 'string') {
        if (item.min && typeof item.min === 'number' && item.value.length < item.min) {
          errors[item.key] = item.message;
        }
        if (item.max && typeof item.max === 'number' && item.value.length > item.max) {
          errors[item.key] = item.message;
        }
        if (item.value.length == 0) {
          errors[item.key] = 'Cannot be Blank.';
        }
      } else {
        errors[item.key] = 'Cannot be Blank.';
      }
    }
    break;
  case NUMBER:
    if (item.optional == undefined || item.optional == false) {
      if (typeof item.value === 'number') {
        if (item.value < item.min) {
          errors[item.key] = item.message;
        }
        if (item.value > item.max) {
          errors[item.key] = item.message;
        }
      } else if (typeof item.value === 'string') {

        const numberRegex = new RegExp(/^\d+$/);
        const v = item.value.trim();
        if (!numberRegex.test(v)) {
          errors[item.key] = item.message;
        }
        if (item.min && typeof item.min === 'number' && Number(v) < item.min) {
          errors[item.key] = item.message;
        }
        if (item.max && typeof item.max === 'number' && Number(v) > item.max) {
          errors[item.key] = item.message;
        }
        if (v.length == 0) {
          errors[item.key] = 'Cannot be Blank.';
        }
      } else {
        errors[item.key] = 'Cannot be Blank.';
      }
    }
    break;
  case DATE:
    if (item.optional == undefined || item.optional == false) {
      console.log('is date = ' + item.value instanceof Date);
      if (item.value instanceof Date) {
        
      } else {
        errors[item.key] = 'Cannot be Blank.';
      }
    }
    break;
  default:

  }
  return errors;
}

/* 
  Signature of data: array of objects | array of array of objects
  {
    type: (STRING|NUMBER|DATE)
    optional: true|false     default: false
    key: string - key used for dispatching error if found
    value:  value to be validated
    min: STRING = min length of string, NUMBER = min value, DATA = min date
    max: STRING = max length of string, NUMBER = max value, DATA = max date
    message: string - Error message
  }
*/