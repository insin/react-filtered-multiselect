import React, {PropTypes} from 'react'

function makeLookup(arr, prop) {
  let lkup = {}
  for (let i = 0, l = arr.length; i < l; i++) {
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
  let items = []
  let found = 0
  let valuesLookup = makeLookup(values)
  for (let i = 0, la = arr.length, lv = values.length;
       i < la && found < lv;
       i++) {
    if (valuesLookup[arr[i][prop]]) {
      items.push(arr[i])
      found++
    }
  }
  return items
}

const DEFAULT_CLASS_NAMES = {
  button: 'FilteredMultiSelect__button',
  buttonActive: 'FilteredMultiSelect__button--active',
  filter: 'FilteredMultiSelect__filter',
  select: 'FilteredMultiSelect__select'
}

export default React.createClass({
  displayName: 'FilteredMultiSelect',

  propTypes: {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,

    buttonText: PropTypes.string,
    className: PropTypes.string,
    classNames: PropTypes.object,
    defaultFilter: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    selectedOptions: PropTypes.array,
    size: PropTypes.number,
    textProp: PropTypes.string,
    valueProp: PropTypes.string
  },

  getDefaultProps() {
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
    }
  },

  getInitialState() {
    let {defaultFilter, selectedOptions} = this.props
    return {
      // Filter text
      filter: defaultFilter,
      // Options which haven't been selected and match the filter text
      filteredOptions: this._filterOptions(defaultFilter, selectedOptions),
      // Values of <options> currently selected in the <select>
      selectedValues: []
    }
  },

  componentWillReceiveProps(nextProps) {
    // Update visibile options in response to options or selectedOptions
    // changing. Also update selected values after the re-render completes, as
    // one of the previously selected options may have been removed.
    if (nextProps.options !== this.props.options ||
        nextProps.selectedOptions !== this.props.selectedOptions ||
        nextProps.options.length !== this.props.options.length ||
        nextProps.selectedOptions.length !== this.props.selectedOptions.length) {
      this.setState({
        filteredOptions: this._filterOptions(this.state.filter,
                                             nextProps.selectedOptions,
                                             nextProps.options)
      }, this._updateSelectedValues)
    }
  },

  _getClassName(name, ...modifiers) {
    let classNames = [this.props.classNames[name] || DEFAULT_CLASS_NAMES[name]]
    for (let i = 0, l = modifiers.length; i < l; i++) {
      if (modifiers[i]) {
        classNames.push(this.props.classNames[modifiers[i]] || DEFAULT_CLASS_NAMES[modifiers[i]])
      }
    }
    return classNames.join(' ')
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

    let {textProp, valueProp} = this.props
    let selectedValueLookup = makeLookup(selectedOptions, valueProp)
    let filteredOptions = []

    for (let i = 0, l = options.length; i < l; i++) {
      if (!selectedValueLookup[options[i][valueProp]] &&
          (!filter || options[i][textProp].toUpperCase().indexOf(filter) !== -1)) {
        filteredOptions.push(options[i])
      }
    }

    return filteredOptions
  },

  _onFilterChange(e) {
    let filter = e.target.value
    this.setState({
      filter,
      filteredOptions: this._filterOptions(filter)
    }, this._updateSelectedValues)
  },

  _onFilterKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (this.state.filteredOptions.length === 1) {
        let selectedOption = this.state.filteredOptions[0]
        let selectedOptions = this.props.selectedOptions.concat([selectedOption])
        this.setState({filter: '', selectedValues: []}, () => {
          this.props.onChange(selectedOptions)
        })
      }
    }
  },

  _updateSelectedValues(e) {
    let el = e ? e.target : this.refs.select
    let selectedValues = []
    for (let i = 0, l = el.options.length; i < l; i++) {
      if (el.options[i].selected) {
        selectedValues.push(el.options[i].value)
      }
    }
    // Always update if we were handling an event, otherwise only update if
    // selectedValues has actually changed.
    if (e || String(this.state.selectedValues) !== String(selectedValues)) {
      this.setState({selectedValues})
    }
  },

  /**
   * Adds backing objects for the currently selected options to the selection
   * and calls back with the new list.
   */
  _addSelectedToSelection(e) {
    let selectedOptions =
      this.props.selectedOptions.concat(getItemsByProp(this.state.filteredOptions,
                                                       this.props.valueProp,
                                                       this.state.selectedValues))
    this.setState({selectedValues: []}, () => {
      this.props.onChange(selectedOptions)
    })
  },

  render() {
    let {filter, filteredOptions, selectedValues} = this.state
    let {className, disabled, placeholder, size, textProp, valueProp} = this.props
    let hasSelectedOptions = selectedValues.length > 0
    return <div className={className}>
      <input
         type="text"
         className={this._getClassName('filter')}
         placeholder={placeholder}
         value={filter}
         onChange={this._onFilterChange}
         onKeyPress={this._onFilterKeyPress}
         disabled={disabled}
      />
      <select multiple
         ref="select"
         className={this._getClassName('select')}
         size={size}
         value={selectedValues}
         onChange={this._updateSelectedValues}
         onDoubleClick={this._addSelectedToSelection}
         disabled={disabled}>
        {filteredOptions.map((option) => {
          return <option key={option[valueProp]} value={option[valueProp]}>{option[textProp]}</option>
        })}
      </select>
      <button type="button"
         className={this._getClassName('button', hasSelectedOptions && 'buttonActive')}
         disabled={!hasSelectedOptions}
         onClick={this._addSelectedToSelection}>
        {this.props.buttonText}
      </button>
    </div>
  }
})
