/*!
 * react-filtered-multiselect 0.3.1 - https://github.com/insin/react-filtered-multiselect
 * MIT Licensed
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.FilteredMultiSelect=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null)

function makeLookup(arr, prop) {
  var lkup = {}
  for (var i = 0, l = arr.length; i < l ; i++) {
    if (prop) {
      lkup[arr[i][prop]] = true
    }
    else {
      lkup[arr[i]] = true
    }
  }
  return lkup
}

function getItemsByProp(arr, prop, values) {
  var items = []
  var found = 0
  var valuesLookup = makeLookup(values)
  for (var i = 0, la = arr.length, lv = values.length;
       i < la && found < lv;
       i++) {
    if (valuesLookup[arr[i][prop]]) {
      items.push(arr[i])
      found++
    }
  }
  return items
}

var DEFAULT_CLASS_NAMES = {
  button: 'FilteredMultiSelect__button'
, buttonActive: 'FilteredMultiSelect__button--active'
, filter: 'FilteredMultiSelect__filter'
, select: 'FilteredMultiSelect__select'
}

var FilteredMultiSelect = React.createClass({displayName: 'FilteredMultiSelect',
  propTypes: {
    buttonText: React.PropTypes.string
  , className: React.PropTypes.string
  , classNames: React.PropTypes.object
  , defaultFilter: React.PropTypes.string
  , disabled: React.PropTypes.bool
  , onChange: React.PropTypes.func.isRequired
  , options: React.PropTypes.array.isRequired
  , placeholder: React.PropTypes.string
  , selectedOptions: React.PropTypes.array
  , size: React.PropTypes.number
  , textProp: React.PropTypes.string
  , valueProp: React.PropTypes.string
  },

  getDefaultProps:function() {
    return {
      buttonText: 'Select'
    , className: 'FilteredMultiSelect'
    , classNames: {}
    , defaultFilter: ''
    , disabled: false
    , placeholder: 'type to filter'
    , size: 6
    , selectedOptions: []
    , textProp: 'text'
    , valueProp: 'value'
    }
  },

  getInitialState:function() {
    var $__0=   this.props,defaultFilter=$__0.defaultFilter,selectedOptions=$__0.selectedOptions
    return {
      // Filter text
      filter: defaultFilter
      // Options which haven't been selected and match the filter text
    , filteredOptions: this._filterOptions(defaultFilter, selectedOptions)
      // Values of <options> currently selected in the <select>
    , selectedValues: []
    }
  },

  componentWillReceiveProps:function(nextProps) {
    // Update visibile options in response to options or selectedOptions
    // changing. Also update selected values after the re-render completes, as
    // one of the previously selected options may have been removed.
    if (nextProps.options !== this.props.options ||
        nextProps.selectedOptions !== this.props.selectedOptions ||
        nextProps.options.length != this.props.options.length ||
        nextProps.selectedOptions.length != this.props.selectedOptions.length) {
      this.setState({
        filteredOptions: this._filterOptions(this.state.filter,
                                             nextProps.selectedOptions,
                                             nextProps.options)
      }, this._updateSelectedValues)
    }
  },

  _getClassName:function(name) {
    if (arguments.length == 1) {
      return this.props.classNames[name] || DEFAULT_CLASS_NAMES[name]
    }

    for (var i = 0, l = arguments.length; i < l ; i++) {
      if (arguments[i] in this.props.classNames) {
        return this.props.classNames[arguments[i]]
      }
    }
    return DEFAULT_CLASS_NAMES[name]
  },

  _filterOptions:function(filter, selectedOptions, options) {
    if (typeof filter == 'undefined') {
      filter = this.state.filter
    }
    if (typeof selectedOptions == 'undefined') {
      selectedOptions = this.props.selectedOptions
    }
    if (typeof options == 'undefined') {
      options = this.props.options
    }
    filter = filter.toUpperCase()

    var $__0=   this.props,textProp=$__0.textProp,valueProp=$__0.valueProp
    var selectedValueLookup = makeLookup(selectedOptions, valueProp)
    var filteredOptions = []

    for (var i = 0, l = options.length; i < l ; i++) {
      if (!selectedValueLookup[options[i][valueProp]] &&
          (!filter || options[i][textProp].toUpperCase().indexOf(filter) != -1)) {
        filteredOptions.push(options[i])
      }
    }

    return filteredOptions
  },

  _onFilterChange:function(e) {
    var filter = e.target.value
    this.setState({
      filter:filter
    , filteredOptions: this._filterOptions(filter)
    }, this._updateSelectedValues)
  },

  _onFilterKeyPress:function(e) {
    if (e.key == 'Enter') {
      e.preventDefault()
      if (this.state.filteredOptions.length == 1) {
        var selectedOption = this.state.filteredOptions[0]
        var selectedOptions = this.props.selectedOptions.concat([selectedOption])
        this.setState({filter: '', selectedValues: []}, function()  {
          this.props.onChange(selectedOptions)
        }.bind(this))
      }
    }
  },

  _updateSelectedValues:function(e) {
    var el = e ? e.target : this.refs.select.getDOMNode()
    var selectedValues = []
    for (var i = 0, l = el.options.length; i < l; i++) {
      if (el.options[i].selected) {
        selectedValues.push(el.options[i].value)
      }
    }
    // Always update if we were handling an event, otherwise only update if
    // selectedValues has actually changed.
    if (e || String(this.state.selectedValues) != String(selectedValues)) {
      this.setState({selectedValues:selectedValues})
    }
  },

  /**
   * Adds backing objects for the currently selected options to the selection
   * and calls back with the new list.
   */
  _addSelectedToSelection:function(e) {
    var selectedOptions =
      this.props.selectedOptions.concat(getItemsByProp(this.state.filteredOptions,
                                                       this.props.valueProp,
                                                       this.state.selectedValues))
    this.setState({selectedValues: []}, function()  {
      this.props.onChange(selectedOptions)
    }.bind(this))
  },

  render:function() {
    var $__0=   this,props=$__0.props,state=$__0.state
    var hasSelectedOptions = state.selectedValues.length > 0
    return React.createElement("div", {className: props.className}, 
      React.createElement("input", {
         type: "text", 
         className: this._getClassName('filter'), 
         placeholder: props.placeholder, 
         value: state.filter, 
         onChange: this._onFilterChange, 
         onKeyPress: this._onFilterKeyPress, 
         disabled: props.disabled}
      ), 
      React.createElement("select", {multiple: true, 
         ref: "select", 
         className: this._getClassName('select'), 
         size: props.size, 
         value: state.selectedValues, 
         onChange: this._updateSelectedValues, 
         onDoubleClick: this._addSelectedToSelection, 
         disabled: props.disabled}, 
        this.state.filteredOptions.map(function(option)  {
          return React.createElement("option", {key: option[props.valueProp], value: option[props.valueProp]}, option[props.textProp])
        })
      ), 
      React.createElement("button", {type: "button", 
         className: hasSelectedOptions ? this._getClassName('buttonActive', 'button') : this._getClassName('button'), 
         disabled: !hasSelectedOptions, 
         onClick: this._addSelectedToSelection}, 
        this.props.buttonText
      )
    )
  }
})

module.exports = FilteredMultiSelect
},{}]},{},[1])(1)
});