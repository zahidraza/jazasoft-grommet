(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.utility = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.capitalize = capitalize;
  exports.splitCamelCase = splitCamelCase;
  exports.getArrayFromCsv = getArrayFromCsv;
  exports.getCsvFromArray = getCsvFromArray;
  exports.getCollectionData = getCollectionData;
  exports.normalise = normalise;
  exports.denormalise = denormalise;
  exports.getNDigitStringFromNumber = getNDigitStringFromNumber;

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  /**
   * @return {Array}  returns array of roles
   */
  var getRoles = exports.getRoles = function getRoles() {
    if (sessionStorage.authorities) {
      var authorities = JSON.parse(sessionStorage.authorities);
      return authorities.map(function (a) {
        return a.authority;
      });
    }
    return [];
  };

  function capitalize(param) {
    return param.charAt(0).toUpperCase() + param.slice(1);
  }

  function splitCamelCase(param) {
    var result = param.charAt(0).toUpperCase() + param.slice(1);
    result = result.replace(/([A-Z])/g, ' $1').slice(1);
    return result;
  }

  function getArrayFromCsv(csv) {
    if (csv == undefined) return [];
    return csv.split(/\s*,\s*/);
  }

  function getCsvFromArray(list) {
    var csv = '';
    list.forEach(function (l) {
      return csv += l + ', ';
    });
    if (csv.length > 1) {
      csv = csv.substr(0, csv.length - 2);
    }
    return csv;
  }

  function getCollectionData(collectionData) {
    var collections = [];
    collectionData.forEach(function (cData) {
      var collection = [];
      cData.forEach(function (p) {
        if (p != undefined) {
          var data = p.data,
              restData = _objectWithoutProperties(p, ['data']);

          var dynamicData = {};
          data.forEach(function (d, i) {
            if (i == 0 && d.value == undefined) {
              dynamicData[d.name] = d.label;
            } else {
              dynamicData[d.name] = typeof d.value === 'string' ? d.value.trim() : d.value;
            }
          });
          collection.push(_extends({}, restData, dynamicData));
        }
      });
      collections.push(collection);
    });
    return collections;
  }

  function normalise(list) {
    var object = {};
    list.forEach(function (o) {
      object[o.id] = o;
    });
    return object;
  }

  function denormalise(object) {
    var list = [];
    for (var key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        list.push(object[key]);
      }
    }
    return list;
  }

  // import React from 'react';
  // import Tooltip from 'react-toolbox/lib/tooltip';

  // const createTooltip = (element) => {
  //   const e = (props) => React.createElement(element, {...props});
  //   return Tooltip(e);
  // };

  function getNDigitStringFromNumber(n) {
    var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    var result = String(n);
    var prefix = '';
    for (var i = 0; i < d - result.length; i++) {
      prefix = prefix + '0';
    }
    return prefix + result;
  }
});