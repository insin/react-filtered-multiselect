'use strict';

var React = require('react')

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

var FilteredMultiSelect = React.createClass({
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

  getDefaultProps() {
    return {
      buttonText: 'Select'
    , className: 'FilteredMultiSelect'
    , classNames: {
        button: 'FilteredMultiSelect__button'
      , filter: 'FilteredMultiSelect__filter'
      , select: 'FilteredMultiSelect__select'
      }
    , defaultFilter: ''
    , disabled: false
    , placeholder: 'type to filter'
    , size: 6
    , selectedOptions: []
    , textProp: 'text'
    , valueProp: 'value'
    }
  },

  getInitialState() {
    var {defaultFilter, selectedOptions} = this.props
    return {
      // Filter text
      filter: defaultFilter
      // Options which haven't been selected and match the filter text
    , filteredOptions: this._filterOptions(defaultFilter, selectedOptions)
      // Values of <options> currently selected in the <select>
    , selectedValues: []
    }
  },

  componentWillReceiveProps(nextProps) {
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

  _filterOptions(filter, selectedOptions, options) {
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

    var {textProp, valueProp} = this.props
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

  _onFilterChange(e) {
    var filter = e.target.value
    this.setState({
      filter
    , filteredOptions: this._filterOptions(filter)
    }, this._updateSelectedValues)
  },

  _onFilterKeyPress(e) {
    if (e.key == 'Enter') {
      e.preventDefault()
      if (this.state.filteredOptions.length == 1) {
        var selectedOption = this.state.filteredOptions[0]
        var selectedOptions = this.props.selectedOptions.concat([selectedOption])
        this.setState({filter: '', selectedValues: []}, () => {
          this.props.onChange(selectedOptions)
        })
      }
    }
  },

  _updateSelectedValues(e) {
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
      this.setState({selectedValues})
    }
  },

  _onButtonClick(e) {
    var selectedOptions =
      this.props.selectedOptions.concat(getItemsByProp(this.state.filteredOptions,
                                                       this.props.valueProp,
                                                       this.state.selectedValues))
    this.setState({selectedValues: []}, () => {
      this.props.onChange(selectedOptions)
    })
  },

  render() {
    var {props, state} = this
    return <div className={props.className}>
      <input
         type="text"
         className={props.classNames.filter}
         placeholder={props.placeholder}
         value={state.filter}
         onChange={this._onFilterChange}
         onKeyPress={this._onFilterKeyPress}
         disabled={props.disabled}
      />
      <select multiple
         ref="select"
         className={props.classNames.select}
         size={props.size}
         value={state.selectedValues}
         onChange={this._updateSelectedValues}
         disabled={props.disabled}>
        {this.state.filteredOptions.map((option) => {
          return <option key={option[props.valueProp]} value={option[props.valueProp]}>{option[props.textProp]}</option>
        })}
      </select>
      <button type="button"
         className={props.classNames.button}
         disabled={state.selectedValues.length === 0}
         onClick={this._onButtonClick}>
        {this.props.buttonText}
      </button>
    </div>
  }
})

module.exports = FilteredMultiSelect