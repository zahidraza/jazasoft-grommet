(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-redux', '../actions/formActions', 'grommet/components/Box', 'grommet/components/Button', 'grommet/components/CheckBox', 'grommet/components/Form', 'grommet/components/FormField', 'grommet/components/FormFields', 'grommet/components/Footer', './FormHeader', 'grommet/components/Heading', 'grommet/components/Select'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-redux'), require('../actions/formActions'), require('grommet/components/Box'), require('grommet/components/Button'), require('grommet/components/CheckBox'), require('grommet/components/Form'), require('grommet/components/FormField'), require('grommet/components/FormFields'), require('grommet/components/Footer'), require('./FormHeader'), require('grommet/components/Heading'), require('grommet/components/Select'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRedux, global.formActions, global.Box, global.Button, global.CheckBox, global.Form, global.FormField, global.FormFields, global.Footer, global.FormHeader, global.Heading, global.Select);
    global.GForm = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRedux, _formActions, _Box, _Button, _CheckBox, _Form, _FormField, _FormFields, _Footer, _FormHeader, _Heading, _Select) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

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

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

      _this._onSubmit = _this._onSubmit.bind(_this);
      _this._onCancel = _this._onCancel.bind(_this);
      return _this;
    }

    _createClass(GForm, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var data = this.props.data;

        var formData = {};
        data.forEach(function (fieldset) {
          fieldset.elements.forEach(function (element) {
            if (element.elementType == 'checkbox') {
              formData[element.name] = element.defaultValue == undefined ? false : element.defaultValue;
            }
          });
        });
        if (Object.keys(formData).length != 0) {
          this.props.dispatch({ type: _formActions.FORM_CHANGE, payload: _extends({}, formData) });
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
        this.props.dispatch({ type: _formActions.FORM_CHANGE, payload: _defineProperty({}, name, event.target.checked) });
      }
    }, {
      key: '_onSelectChange',
      value: function _onSelectChange(name, event) {
        this.props.dispatch({ type: _formActions.FORM_CHANGE, payload: _defineProperty({}, name, event.value) });
      }
    }, {
      key: '_onInputChange',
      value: function _onInputChange(name, event) {
        this.props.dispatch({ type: _formActions.FORM_CHANGE, payload: _defineProperty({}, name, event.target.value) });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            title = _props.title,
            busy = _props.busy,
            data = _props.data,
            submitControl = _props.submitControl,
            _props$form = _props.form,
            formData = _props$form.formData,
            toggleForm = _props$form.toggleForm,
            _props$err = _props.err,
            error = _props$err.error,
            show = _props$err.show;


        var submit = void 0,
            cancel = void 0;
        if (!busy) {
          submit = this._onSubmit;
          cancel = this._onCancel;
        }

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
                _react2.default.createElement('input', { type: type, name: e.name, value: formData[e.name] == undefined ? '' : formData[e.name], onChange: _this2._onInputChange.bind(_this2, e.name) })
              );
            }
            if (e.elementType == 'select') {
              var _type = e.type != undefined ? e.type : 'text';
              var value = formData[e.name] != undefined ? formData[e.name] : e.placeholder;
              element = _react2.default.createElement(
                _FormField2.default,
                { key: i, label: e.label },
                _react2.default.createElement(_Select2.default, { options: e.options,
                  value: value, onChange: _this2._onSelectChange.bind(_this2, e.name) })
              );
            }
            if (e.elementType == 'checkbox') {
              element = _react2.default.createElement(
                _FormField2.default,
                { key: i },
                _react2.default.createElement(_CheckBox2.default, { label: e.label, checked: formData[e.name] == undefined ? false : formData[e.name], toggle: true, onChange: _this2._onToggleChange.bind(_this2, e.name) })
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

        var footer = void 0;
        if (submitControl) {
          footer = _react2.default.createElement(
            _Footer2.default,
            { pad: { 'vertical': 'medium' }, justify: 'between' },
            _react2.default.createElement(_Button2.default, { label: 'Add', primary: true, onClick: submit }),
            _react2.default.createElement(_Button2.default, { label: 'Cancel', onClick: cancel })
          );
        }

        var content = _react2.default.createElement(
          _Form2.default,
          null,
          _react2.default.createElement(_FormHeader2.default, { title: title, busy: busy }),
          _react2.default.createElement(
            _FormFields2.default,
            null,
            fieldsets
          ),
          footer
        );

        return _react2.default.createElement(
          _Box2.default,
          { alignSelf: 'center' },
          content
        );
      }
    }]);

    return GForm;
  }(_react.Component);

  GForm.propTypes = {
    data: _propTypes2.default.array,
    title: _propTypes2.default.string.isRequired,
    busy: _propTypes2.default.bool,
    submitControl: _propTypes2.default.bool,
    onSubmit: _propTypes2.default.func,
    onCancel: _propTypes2.default.func
  };

  GForm.defaultProps = {
    busy: false,
    submitControl: false
  };

  var select = function select(store) {
    return { form: store.form, err: store.err };
  };

  exports.default = (0, _reactRedux.connect)(select)(GForm);
});