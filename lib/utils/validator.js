(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../actions/errActions', '../actions/notificationActions'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../actions/errActions'), require('../actions/notificationActions'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.errActions, global.notificationActions);
    global.validator = mod.exports;
  }
})(this, function (exports, _errActions, _notificationActions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EMAIL = exports.DATE = exports.NUMBER = exports.STRING = undefined;
  exports.validate = validate;
  var STRING = exports.STRING = 'STRING';
  var NUMBER = exports.NUMBER = 'NUMBER';
  var DATE = exports.DATE = 'DATE';
  var EMAIL = exports.EMAIL = 'EMAIL';

  //Return true if no errors, false if some errors
  //Is data valid ?  true : if no errors, false: if any errors
  function validate(dispatch, objectData, arrayData) {
    var error = {};
    var errors = [];
    var collectionError = false;
    objectData.forEach(function (e) {
      error = validateItem(e, error);
    });
    if (arrayData) {
      arrayData.forEach(function (e, idx) {
        e.forEach(function (el) {
          if (!errors[idx]) errors[idx] = {};
          errors[idx] = validateItem(el, errors[idx]);
        });
        if (Object.keys(errors[idx]).length != 0) {
          collectionError = true;
        }
      });
    }
    if (Object.keys(error).length != 0 || collectionError) {
      dispatch({ type: _errActions.BAD_REQUEST, payload: { error: error, errors: errors } });
      dispatch({ type: _notificationActions.SHOW_SNACKBAR, payload: { snackbar: { message: 'Rectify errors and submit again.' } } });
      return false;
    }
    return true;
  }

  function validateItem(item, errors) {
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

            var numberRegex = new RegExp(/^\d+$/);
            var v = item.value.trim();
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
          if (item.value instanceof Date) {} else {
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
});