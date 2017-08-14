(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-redux', '../actions/formActions', 'grommet/components/icons/base/Add', 'grommet/components/Box', 'grommet/components/Button', 'grommet/components/CheckBox', 'grommet/components/Form', 'grommet/components/FormField', 'grommet/components/FormFields', 'grommet/components/Footer', './FormHeader', 'grommet/components/Heading', 'grommet/components/Select', './DTable', './Dailog'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-redux'), require('../actions/formActions'), require('grommet/components/icons/base/Add'), require('grommet/components/Box'), require('grommet/components/Button'), require('grommet/components/CheckBox'), require('grommet/components/Form'), require('grommet/components/FormField'), require('grommet/components/FormFields'), require('grommet/components/Footer'), require('./FormHeader'), require('grommet/components/Heading'), require('grommet/components/Select'), require('./DTable'), require('./Dailog'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRedux, global.formActions, global.Add, global.Box, global.Button, global.CheckBox, global.Form, global.FormField, global.FormFields, global.Footer, global.FormHeader, global.Heading, global.Select, global.DTable, global.Dailog);
    global.GForm = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRedux, _formActions, _Add, _Box, _Button, _CheckBox, _Form, _FormField, _FormFields, _Footer, _FormHeader, _Heading, _Select, _DTable, _Dailog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Add2 = _interopRequireDefault(_Add);

  var _Box2 = _interopRequireDefault(_Box);

  var _Button2 = _interopRequireDefault(_Button);

  var _CheckBox2 = _interopRequireDefault(_CheckBox);

  var _Form2 = _interopRequireDefault(_Form);

  var _FormField2 = _interopRequireDefault(_FormField);

  var _FormFields2 = _interopRequireDefault(_FormFields);

  var _Footer2 = _interopRequireDefault(_Footer);

  var _FormHeader2 = _interopRequireDefault(_FormHeader);

  var _Heading2 = _interopRequireDefault(_Heading);

  var _Select2 = _interopRequireDefault(_Select);

  var _DTable2 = _interopRequireDefault(_DTable);

  var _Dailog2 = _interopRequireDefault(_Dailog);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var GForm = function (_Component) {
    _inherits(GForm, _Component);

    function GForm() {
      _classCallCheck(this, GForm);

      var _this = _possibleConstructorReturn(this, (GForm.__proto__ || Object.getPrototypeOf(GForm)).call(this));

      _this._onRemove = _this._onRemove.bind(_this);
      _this._toggleDailog = _this._toggleDailog.bind(_this);
      _this._submitDailog = _this._submitDailog.bind(_this);
      _this._onDailogSelectChange = _this._onDailogSelectChange.bind(_this);
      _this._onSubmit = _this._onSubmit.bind(_this);
      _this._onCancel = _this._onCancel.bind(_this);
      _this._onSelectChange = _this._onSelectChange.bind(_this);
      _this._onToggleChange = _this._onToggleChange.bind(_this);
      _this._onInputChange = _this._onInputChange.bind(_this);
      _this._onDInputChange = _this._onDInputChange.bind(_this);
      _this._onDToggleChange = _this._onDToggleChange.bind(_this);

      _this.state = {
        dialogActive: [],
        // collection: {
        //   value: '',
        //   items: [],
        //   selectedItems: []
        // },
        collection: [],
        elements: [],
        dtElements: []
      };
      return _this;
    }

    /*
      When Component mounts: 
      1. check if any form element is of type checkbox, if so initialize the value and send action
      2. If collectionItems are there, initialize state with items and value
    */


    _createClass(GForm, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this2 = this;

        var _props = this.props,
            data = _props.data,
            collectionData = _props.collectionData;

        var formData = {};
        data.forEach(function (fieldset) {
          fieldset.elements.forEach(function (element) {
            if (element.elementType == 'checkbox') {
              formData[element.name] = element.defaultValue == undefined ? false : element.defaultValue;
            }
          });
        });
        if (Object.keys(formData).length != 0) {
          this.props.dispatch({ type: _formActions.FORM_CHANGE_BASIC, payload: _extends({}, formData) });
        }

        if (collectionData != undefined) {
          var collection = [];
          var elements = [];
          var dialogActive = [];
          collectionData.forEach(function (cData, idx) {
            var coll = {};
            coll.items = cData.collectionItems.map(function (c) {
              return typeof c === 'string' ? c : c.name;
            });
            elements[idx] = cData.elements.map(function (e) {
              if (e.type == 'input') {
                e.action = _this2._onDInputChange.bind(_this2, idx);
              }
              if (e.type == 'checkbox') {
                e.action = _this2._onDToggleChange.bind(_this2, idx);
              }
              return e;
            });
            coll.value = cData.dialogPlaceholder != undefined ? cData.dialogPlaceholder : 'Select';
            collection.push(coll);
            dialogActive.push(false);
          });

          this.setState({ collection: collection, elements: elements, dialogActive: dialogActive });
        }
      }
    }, {
      key: '_onSubmit',
      value: function _onSubmit() {
        if (this.props.onSubmit) {
          this.props.onSubmit();
        }
      }
    }, {
      key: '_onCancel',
      value: function _onCancel() {
        if (this.props.onCancel) {
          this.props.onCancel();
        }
      }
    }, {
      key: '_onToggleChange',
      value: function _onToggleChange(name, event) {
        this.props.dispatch({ type: _formActions.FORM_CHANGE_BASIC, payload: _defineProperty({}, name, event.target.checked) });
      }
    }, {
      key: '_onSelectChange',
      value: function _onSelectChange(name, event) {
        this.props.dispatch({ type: _formActions.FORM_CHANGE_BASIC, payload: _defineProperty({}, name, event.value) });
      }
    }, {
      key: '_onInputChange',
      value: function _onInputChange(name, event) {
        this.props.dispatch({ type: _formActions.FORM_CHANGE_BASIC, payload: _defineProperty({}, name, event.target.value) });
      }
    }, {
      key: '_onDInputChange',
      value: function _onDInputChange(row, col, name, event) {
        var dtElements = this.state.dtElements;

        dtElements[row][col].data.forEach(function (e) {
          if (e.name == name) {
            e.value = event.target.value;
          }
        });
        this.setState({ dtElements: dtElements });
        this.props.dispatch({ type: _formActions.FORM_CHANGE_COLLECTION, payload: { index: row, collections: [].concat(_toConsumableArray(dtElements[row])) } });
        //this.props.dispatch({type: FORM_CHANGE_BASIC, payload: { collections: [...dtElements]}});
      }
    }, {
      key: '_onDToggleChange',
      value: function _onDToggleChange(row, col, name, event) {
        var dtElements = this.state.dtElements;

        dtElements[row][col].data.forEach(function (e) {
          if (e.name == name) {
            e.value = event.target.checked;
          }
        });
        this.setState({ dtElements: dtElements });
        this.props.dispatch({ type: _formActions.FORM_CHANGE_COLLECTION, payload: { index: row, collections: [].concat(_toConsumableArray(dtElements[row])) } });
        //this.props.dispatch({type: FORM_CHANGE_BASIC, payload: { collections: [...dtElements]}});
      }
    }, {
      key: '_toggleDailog',
      value: function _toggleDailog(index) {
        var dialogActive = this.state.dialogActive;

        dialogActive[index] = !dialogActive[index];
        this.setState({ dialogActive: dialogActive });
      }
    }, {
      key: '_onDailogSelectChange',
      value: function _onDailogSelectChange(index, event) {
        var collection = this.state.collection;

        collection[index].value = event.value;
        this.setState({ collection: collection });
      }
    }, {
      key: '_onRemove',
      value: function _onRemove(row, col) {
        var _state = this.state,
            collection = _state.collection,
            dtElements = _state.dtElements;

        var coll = collection[row];
        var rItem = coll.selectedItems[col];
        coll.selectedItems = coll.selectedItems.filter(function (s) {
          return typeof s === 'string' ? s != rItem.name : s.name != rItem.name;
        });
        coll.items.push(rItem.name);
        var elements = [];
        dtElements[row].forEach(function (e, i) {
          if (i != col) return elements.push(_extends({}, e));
        });
        dtElements[row] = elements;
        collection[row] = coll;
        this.setState({ collection: collection, dtElements: dtElements });
        this.props.dispatch({ type: _formActions.FORM_CHANGE_COLLECTION, payload: { index: row, collections: [].concat(_toConsumableArray(dtElements[row])) } });
      }
    }, {
      key: '_submitDailog',
      value: function _submitDailog(index) {
        var _state2 = this.state,
            collection = _state2.collection,
            dtElements = _state2.dtElements,
            elements = _state2.elements,
            dialogActive = _state2.dialogActive;
        var collectionData = this.props.collectionData;

        var currItem = void 0;
        var coll = collection[index];

        if (!coll.value.includes(collectionData[index].dialogPlaceholder)) {
          coll.items = coll.items.filter(function (s) {
            return s != coll.value;
          });
          coll.selectedItems = collectionData[index].collectionItems.filter(function (s) {
            return typeof s === 'string' ? !coll.items.includes(s) : !coll.items.includes(s.name);
          });
          currItem = collectionData[index].collectionItems.find(function (c) {
            return typeof c === 'string' ? c == coll.value : c.name == coll.value;
          });
        }
        coll.value = collectionData[index].dialogPlaceholder;
        collection[index] = coll;

        //prepare elements for dynamic table
        // rowItem = [ data: elements array, ...restData]
        var rowItem = void 0;
        var data = elements[index].map(function (e) {
          return _extends({}, e);
        });
        if (typeof currItem === 'string') {
          data[0].label = currItem;
          rowItem = { data: data };
        } else {
          var _currItem = currItem,
              name = _currItem.name,
              id = _currItem.id,
              restData = _objectWithoutProperties(_currItem, ['name', 'id']);

          data[0].label = name;
          if (id != undefined) {
            data[0].value = id;
          }
          rowItem = _extends({ data: data }, restData);
        }
        if (dtElements[index] != undefined) {
          dtElements[index].push(rowItem);
        } else {
          dtElements[index] = [rowItem];
        }
        dialogActive[index] = false;
        this.setState({ collection: collection, dialogActive: dialogActive, dtElements: dtElements });
        this.props.dispatch({ type: _formActions.FORM_CHANGE_COLLECTION, payload: { index: index, collections: [].concat(_toConsumableArray(dtElements[index])) } });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var _props2 = this.props,
            width = _props2.width,
            title = _props2.title,
            busy = _props2.busy,
            data = _props2.data,
            submitControl = _props2.submitControl,
            collectionData = _props2.collectionData,
            _props2$form = _props2.form,
            formData = _props2$form.formData,
            toggleForm = _props2$form.toggleForm,
            _props2$err = _props2.err,
            error = _props2$err.error,
            show = _props2$err.show;
        var _state3 = this.state,
            dialogActive = _state3.dialogActive,
            collection = _state3.collection,
            dtElements = _state3.dtElements;


        var submit = void 0,
            cancel = void 0;
        if (!busy) {
          submit = this._onSubmit;
          cancel = this._onCancel;
        }

        //Basic Form related
        var basicForm = void 0;
        if (data != undefined) {
          var fieldsets = data.map(function (fieldset, idx) {
            var title = void 0;
            if (fieldset.title != undefined) {
              title = _react2.default.createElement(
                _Box2.default,
                { direction: 'row', justify: 'between' },
                _react2.default.createElement(
                  _Heading2.default,
                  { tag: 'h3' },
                  fieldset.title
                )
              );
            }

            var elements = fieldset.elements.map(function (e, i) {
              var element = void 0;
              if (e.elementType == 'input') {
                var type = e.type != undefined ? e.type : 'text';
                element = _react2.default.createElement(
                  _FormField2.default,
                  { key: i, label: e.label, error: error[e.name] },
                  _react2.default.createElement('input', { type: type, name: e.name, value: formData[e.name] == undefined ? '' : formData[e.name], onChange: _this3._onInputChange.bind(_this3, e.name) })
                );
              }
              if (e.elementType == 'select') {
                var _type = e.type != undefined ? e.type : 'text';
                var value = formData[e.name] != undefined ? formData[e.name] : e.placeholder;
                element = _react2.default.createElement(
                  _FormField2.default,
                  { key: i, label: e.label },
                  _react2.default.createElement(_Select2.default, { options: e.options,
                    value: value, onChange: _this3._onSelectChange.bind(_this3, e.name) })
                );
              }
              if (e.elementType == 'checkbox') {
                element = _react2.default.createElement(
                  _FormField2.default,
                  { key: i },
                  _react2.default.createElement(_CheckBox2.default, { label: e.label, checked: formData[e.name] == undefined ? false : formData[e.name], toggle: true, onChange: _this3._onToggleChange.bind(_this3, e.name) })
                );
              }
              return element;
            });

            return _react2.default.createElement(
              'fieldset',
              { key: idx },
              title,
              elements
            );
          });
          basicForm = _react2.default.createElement(
            _Form2.default,
            { plain: true },
            _react2.default.createElement(_FormHeader2.default, { title: title, busy: busy }),
            _react2.default.createElement(
              _FormFields2.default,
              null,
              fieldsets
            )
          );
        }

        //Collection related
        var collectionItems = void 0;
        if (collectionData != undefined) {

          collectionItems = collectionData.map(function (cData, idx) {
            var data = dtElements[idx] != undefined ? dtElements[idx].map(function (e) {
              return e.data;
            }) : [];

            var collectionItem = _react2.default.createElement(
              'div',
              { key: idx },
              _react2.default.createElement(
                _Box2.default,
                { direction: 'row', justify: 'between', pad: { vertical: 'medium' } },
                _react2.default.createElement(
                  _Box2.default,
                  { alignSelf: 'center' },
                  _react2.default.createElement(
                    _Heading2.default,
                    { strong: true, tag: 'h3' },
                    cData.secondaryTitle
                  )
                ),
                _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null), onClick: _this3._toggleDailog.bind(_this3, idx) })
              ),
              _react2.default.createElement(
                _Box2.default,
                null,
                _react2.default.createElement(_DTable2.default, { headers: cData.headers,
                  elements: data,
                  removeControl: true,
                  onRemove: _this3._onRemove.bind(_this3, idx),
                  container: cData.container
                })
              ),
              _react2.default.createElement(
                _Dailog2.default,
                {
                  title: cData.secondaryTitle,
                  active: dialogActive[idx],
                  onCancel: _this3._toggleDailog.bind(_this3, idx),
                  onSubmit: _this3._submitDailog.bind(_this3, idx)
                },
                _react2.default.createElement(_Select2.default, { options: collection[idx].items,
                  value: collection[idx].value, onChange: _this3._onDailogSelectChange.bind(_this3, idx) })
              )
            );
            return collectionItem;
          });
        }

        //Footer common
        var footer = void 0;
        if (submitControl) {
          footer = _react2.default.createElement(
            _Footer2.default,
            { pad: { 'vertical': 'medium' }, justify: 'between' },
            _react2.default.createElement(_Button2.default, { label: 'Add', primary: true, onClick: submit }),
            _react2.default.createElement(_Button2.default, { label: 'Cancel', onClick: cancel })
          );
        }

        return _react2.default.createElement(
          _Box2.default,
          { size: width, alignSelf: 'center', justify: 'center' },
          basicForm,
          collectionItems,
          footer
        );
      }
    }]);

    return GForm;
  }(_react.Component);

  GForm.propTypes = {

    data: _propTypes2.default.array,
    title: _propTypes2.default.string,
    busy: _propTypes2.default.bool,

    width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    submitControl: _propTypes2.default.bool,
    onSubmit: _propTypes2.default.func,
    onCancel: _propTypes2.default.func,

    collectionData: _propTypes2.default.array

  };

  GForm.defaultProps = {
    busy: false,
    submitControl: false,
    width: 'medium'
  };

  var select = function select(store) {
    return { form: store.form, err: store.err };
  };

  exports.default = (0, _reactRedux.connect)(select)(GForm);
});