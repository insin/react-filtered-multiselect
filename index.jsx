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

  getDefaultProps: function() {
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

  getInitialState: function() {
    return {
      // Filter text
      filter: this.props.defaultFilter
      // Options which haven't been selected and match the filter text
    , filteredOptions: this.filterOptions(this.props.defaultFilter,
                                          this.props.selectedOptions)
      // Options which have been selected by pressing Enter or the Select button
    , selectedOptions: this.props.selectedOptions.slice()
      // Values of <options> currently selected in the <select>
    , selectedValues: []
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.selectedOptions.length != this.state.selectedOptions.length) {
      this.setState({
        filteredOptions: this.filterOptions(this.state.filter, nextProps.selectedOptions)
      , selectedOptions: nextProps.selectedOptions.slice()
      })
    }
  },

  filterOptions: function(filter, selectedOptions) {
    if (typeof filter == 'undefined') {
      filter = this.state.filter
    }
    if (typeof selectedOptions == 'undefined') {
      selectedOptions = this.state.selectedOptions
    }
    filter = filter.toUpperCase()

    var options = this.props.options
    var textProp = this.props.textProp
    var valueProp = this.props.valueProp
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

  onFilterChange: function(e) {
    var filter = e.target.value
    this.setState({
      filter: filter
    , filteredOptions: this.filterOptions(filter)
    })
  },

  onFilterKeyPress: function(e) {
    if (e.key == 'Enter') {
      e.preventDefault()
      if (this.state.filteredOptions.length == 1) {
        var selectedOption = this.state.filteredOptions[0]
        var selectedOptions = this.state.selectedOptions.slice().concat([selectedOption])
        this.setState({
          filter: ''
        , filteredOptions: this.filterOptions('', selectedOptions)
        , selectedOptions: selectedOptions
        }, this.props.onChange.bind(null, selectedOptions))
      }
    }
  },

  onSelectChange: function(e) {
    var el = e.target
    var selectedValues = []
    for (var i = 0, l = el.options.length; i < l; i++) {
      if (el.options[i].selected) {
        selectedValues.push(el.options[i].value)
      }
    }
    this.setState({selectedValues: selectedValues})
  },

  selectOptions: function(e) {
    var selectedOptions =
      this.state.selectedOptions.concat(getItemsByProp(this.state.filteredOptions,
                                                       this.props.valueProp,
                                                       this.state.selectedValues))
    this.setState({
      filteredOptions: this.filterOptions(this.state.filter, selectedOptions)
    , selectedOptions: selectedOptions
    , selectedValues: []
    }, this.props.onChange.bind(null, selectedOptions))
  },

  render: function() {
    var props = this.props
    var state = this.state
    return <div className={props.className}>
      <input
         type="text"
         className={props.classNames.filter}
         placeholder={props.placeholder}
         value={state.filter}
         onChange={this.onFilterChange}
         onKeyPress={this.onFilterKeyPress}
         disabled={props.disabled}
      />
      <select multiple
         className={props.classNames.select}
         size={props.size}
         value={state.selectedValues}
         onChange={this.onSelectChange}
         disabled={props.disabled}>
        {this.state.filteredOptions.map(function(option) {
          return <option key={option[props.valueProp]} value={option[props.valueProp]}>{option[props.textProp]}</option>
        })}
      </select>
      <button type="button"
         className={props.classNames.button}
         disabled={state.selectedValues.length === 0}
         onClick={this.selectOptions}>
        {this.props.buttonText}
      </button>
    </div>
  }
})

module.exports = FilteredMultiSelect