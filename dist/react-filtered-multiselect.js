/*!
 * react-filtered-multiselect 0.4.0 - https://github.com/insin/react-filtered-multiselect
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["FilteredMultiSelect"] = factory(require("react"));
	else
		root["FilteredMultiSelect"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function makeLookup(arr, prop) {
	  var lkup = {};
	  for (var i = 0, l = arr.length; i < l; i++) {
	    if (prop) {
	      lkup[arr[i][prop]] = true;
	    } else {
	      lkup[arr[i]] = true;
	    }
	  }
	  return lkup;
	}

	function getItemsByProp(arr, prop, values) {
	  var items = [];
	  var found = 0;
	  var valuesLookup = makeLookup(values);
	  for (var i = 0, la = arr.length, lv = values.length; i < la && found < lv; i++) {
	    if (valuesLookup[arr[i][prop]]) {
	      items.push(arr[i]);
	      found++;
	    }
	  }
	  return items;
	}

	var DEFAULT_CLASS_NAMES = {
	  button: 'FilteredMultiSelect__button',
	  buttonActive: 'FilteredMultiSelect__button--active',
	  filter: 'FilteredMultiSelect__filter',
	  select: 'FilteredMultiSelect__select'
	};

	exports['default'] = _react2['default'].createClass({
	  displayName: 'FilteredMultiSelect',

	  propTypes: {
	    onChange: _react.PropTypes.func.isRequired,
	    options: _react.PropTypes.array.isRequired,

	    buttonText: _react.PropTypes.string,
	    className: _react.PropTypes.string,
	    classNames: _react.PropTypes.object,
	    defaultFilter: _react.PropTypes.string,
	    disabled: _react.PropTypes.bool,
	    placeholder: _react.PropTypes.string,
	    selectedOptions: _react.PropTypes.array,
	    size: _react.PropTypes.number,
	    textProp: _react.PropTypes.string,
	    valueProp: _react.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      buttonText: 'Select',
	      className: 'FilteredMultiSelect',
	      classNames: {},
	      defaultFilter: '',
	      disabled: false,
	      placeholder: 'type to filter',
	      size: 6,
	      selectedOptions: [],
	      textProp: 'text',
	      valueProp: 'value'
	    };
	  },

	  getInitialState: function getInitialState() {
	    var _props = this.props;
	    var defaultFilter = _props.defaultFilter;
	    var selectedOptions = _props.selectedOptions;

	    return {
	      // Filter text
	      filter: defaultFilter,
	      // Options which haven't been selected and match the filter text
	      filteredOptions: this._filterOptions(defaultFilter, selectedOptions),
	      // Values of <options> currently selected in the <select>
	      selectedValues: []
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    // Update visibile options in response to options or selectedOptions
	    // changing. Also update selected values after the re-render completes, as
	    // one of the previously selected options may have been removed.
	    if (nextProps.options !== this.props.options || nextProps.selectedOptions !== this.props.selectedOptions || nextProps.options.length !== this.props.options.length || nextProps.selectedOptions.length !== this.props.selectedOptions.length) {
	      this.setState({
	        filteredOptions: this._filterOptions(this.state.filter, nextProps.selectedOptions, nextProps.options)
	      }, this._updateSelectedValues);
	    }
	  },

	  _getClassName: function _getClassName(name) {
	    if (arguments.length === 1) {
	      return this.props.classNames[name] || DEFAULT_CLASS_NAMES[name];
	    }

	    for (var i = 0, l = arguments.length; i < l; i++) {
	      if (arguments[i] in this.props.classNames) {
	        return this.props.classNames[arguments[i]];
	      }
	    }
	    return DEFAULT_CLASS_NAMES[name];
	  },

	  _filterOptions: function _filterOptions(filter, selectedOptions, options) {
	    if (typeof filter == 'undefined') {
	      filter = this.state.filter;
	    }
	    if (typeof selectedOptions == 'undefined') {
	      selectedOptions = this.props.selectedOptions;
	    }
	    if (typeof options == 'undefined') {
	      options = this.props.options;
	    }
	    filter = filter.toUpperCase();

	    var _props2 = this.props;
	    var textProp = _props2.textProp;
	    var valueProp = _props2.valueProp;

	    var selectedValueLookup = makeLookup(selectedOptions, valueProp);
	    var filteredOptions = [];

	    for (var i = 0, l = options.length; i < l; i++) {
	      if (!selectedValueLookup[options[i][valueProp]] && (!filter || options[i][textProp].toUpperCase().indexOf(filter) !== -1)) {
	        filteredOptions.push(options[i]);
	      }
	    }

	    return filteredOptions;
	  },

	  _onFilterChange: function _onFilterChange(e) {
	    var filter = e.target.value;
	    this.setState({
	      filter: filter,
	      filteredOptions: this._filterOptions(filter)
	    }, this._updateSelectedValues);
	  },

	  _onFilterKeyPress: function _onFilterKeyPress(e) {
	    var _this = this;

	    if (e.key === 'Enter') {
	      e.preventDefault();
	      if (this.state.filteredOptions.length === 1) {
	        var selectedOption = this.state.filteredOptions[0];
	        var selectedOptions = this.props.selectedOptions.concat([selectedOption]);
	        this.setState({ filter: '', selectedValues: [] }, function () {
	          _this.props.onChange(selectedOptions);
	        });
	      }
	    }
	  },

	  _updateSelectedValues: function _updateSelectedValues(e) {
	    var el = e ? e.target : this.refs.select;
	    var selectedValues = [];
	    for (var i = 0, l = el.options.length; i < l; i++) {
	      if (el.options[i].selected) {
	        selectedValues.push(el.options[i].value);
	      }
	    }
	    // Always update if we were handling an event, otherwise only update if
	    // selectedValues has actually changed.
	    if (e || String(this.state.selectedValues) !== String(selectedValues)) {
	      this.setState({ selectedValues: selectedValues });
	    }
	  },

	  /**
	   * Adds backing objects for the currently selected options to the selection
	   * and calls back with the new list.
	   */
	  _addSelectedToSelection: function _addSelectedToSelection(e) {
	    var _this2 = this;

	    var selectedOptions = this.props.selectedOptions.concat(getItemsByProp(this.state.filteredOptions, this.props.valueProp, this.state.selectedValues));
	    this.setState({ selectedValues: [] }, function () {
	      _this2.props.onChange(selectedOptions);
	    });
	  },

	  render: function render() {
	    var props = this.props;
	    var state = this.state;

	    var hasSelectedOptions = state.selectedValues.length > 0;
	    return _react2['default'].createElement(
	      'div',
	      { className: props.className },
	      _react2['default'].createElement('input', {
	        type: 'text',
	        className: this._getClassName('filter'),
	        placeholder: props.placeholder,
	        value: state.filter,
	        onChange: this._onFilterChange,
	        onKeyPress: this._onFilterKeyPress,
	        disabled: props.disabled
	      }),
	      _react2['default'].createElement(
	        'select',
	        { multiple: true,
	          ref: 'select',
	          className: this._getClassName('select'),
	          size: props.size,
	          value: state.selectedValues,
	          onChange: this._updateSelectedValues,
	          onDoubleClick: this._addSelectedToSelection,
	          disabled: props.disabled },
	        this.state.filteredOptions.map(function (option) {
	          return _react2['default'].createElement(
	            'option',
	            { key: option[props.valueProp], value: option[props.valueProp] },
	            option[props.textProp]
	          );
	        })
	      ),
	      _react2['default'].createElement(
	        'button',
	        { type: 'button',
	          className: hasSelectedOptions ? this._getClassName('buttonActive', 'button') : this._getClassName('button'),
	          disabled: !hasSelectedOptions,
	          onClick: this._addSelectedToSelection },
	        this.props.buttonText
	      )
	    );
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;