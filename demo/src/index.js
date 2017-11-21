import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import {render} from 'react-dom'
import FilteredMultiSelect from '../../src/index'

import CULTURE_SHIPS from './ships.json'
import FRUIT from './fruit.json'

const BOOTSTRAP_CLASSES = {
  filter: 'form-control',
  select: 'form-control',
  button: 'btn btn btn-block btn-default',
  buttonActive: 'btn btn btn-block btn-primary',
}

class BasicSelection extends React.Component {
  state = {
    selectedOptions: []
  }

  handleDeselect(index) {
    var selectedOptions = this.state.selectedOptions.slice()
    selectedOptions.splice(index, 1)
    this.setState({selectedOptions})
  }

  handleClearSelection = (e) => {
    this.setState({selectedOptions: []})
  }
  handleSelectionChange = (selectedOptions) => {
    selectedOptions.sort((a, b) => a.id - b.id)
    this.setState({selectedOptions})
  }

  render() {
    var {selectedOptions} = this.state
    return <div className="row">
      <div className="col-md-5">
        <FilteredMultiSelect
          classNames={BOOTSTRAP_CLASSES}
          onChange={this.handleSelectionChange}
          options={CULTURE_SHIPS}
          selectedOptions={selectedOptions}
          textProp="name"
          valueProp="id"
        />
        <p className="help-block">Press Enter when there's only one matching item to select it.</p>
      </div>
      <div className="col-md-5">
        {selectedOptions.length === 0 && <p>(nothing selected yet)</p>}
        {selectedOptions.length > 0 && <ol>
          {selectedOptions.map((ship, i) => <li key={ship.id}>
            {`${ship.name} `}
            <span style={{cursor: 'pointer'}} onClick={() => this.handleDeselect(i)}>
              &times;
            </span>
          </li>)}
        </ol>}
        {selectedOptions.length > 0 && <button style={{marginLeft: 20}} className="btn btn-default" onClick={this.handleClearSelection}>
          Clear Selection
        </button>}
      </div>
    </div>
  }
}

class AddRemoveSelection extends React.Component {
  state = {
    selectedOptions: []
  }

  handleDeselect = (deselectedOptions) => {
    var selectedOptions = this.state.selectedOptions.slice()
    deselectedOptions.forEach(option => {
      selectedOptions.splice(selectedOptions.indexOf(option), 1)
    })
    this.setState({selectedOptions})
  }
  handleSelect = (selectedOptions) => {
    selectedOptions.sort((a, b) => a.id - b.id)
    this.setState({selectedOptions})
  }

  render() {
    var {selectedOptions} = this.state
    return <div className="row">
      <div className="col-md-5">
        <FilteredMultiSelect
          buttonText="Add"
          classNames={BOOTSTRAP_CLASSES}
          onChange={this.handleSelect}
          options={CULTURE_SHIPS}
          selectedOptions={selectedOptions}
          textProp="name"
          valueProp="id"
        />
      </div>
      <div className="col-md-5">
        <FilteredMultiSelect
          buttonText="Remove"
          classNames={{
            filter: 'form-control',
            select: 'form-control',
            button: 'btn btn btn-block btn-default',
            buttonActive: 'btn btn btn-block btn-danger'
          }}
          onChange={this.handleDeselect}
          options={selectedOptions}
          textProp="name"
          valueProp="id"
        />
      </div>
    </div>
  }
}

class NoFilter extends React.Component {
  state = {
    selectedOptions: []
  }

  handleDeselect(index) {
    var selectedOptions = this.state.selectedOptions.slice()
    selectedOptions.splice(index, 1)
    this.setState({selectedOptions})
  }

  handleClearSelection = (e) => {
    this.setState({selectedOptions: []})
  }
  handleSelectionChange = (selectedOptions) => {
    selectedOptions.sort((a, b) => a.id - b.id)
    this.setState({selectedOptions})
  }

  render() {
    var {selectedOptions} = this.state
    return <div className="row">
      <div className="col-md-5">
        <FilteredMultiSelect
          classNames={BOOTSTRAP_CLASSES}
          onChange={this.handleSelectionChange}
          options={FRUIT}
          selectedOptions={selectedOptions}
          textProp="name"
          valueProp="id"
          showFilter={false}
        />
      </div>
      <div className="col-md-5">
        {selectedOptions.length === 0 && <p>(nothing selected yet)</p>}
        {selectedOptions.length > 0 && <ol>
          {selectedOptions.map((fruit, i) => <li key={fruit.id}>
            {`${fruit.name} `}
            <span style={{cursor: 'pointer'}} onClick={() => this.handleDeselect(i)}>
              &times;
            </span>
          </li>)}
        </ol>}
        {selectedOptions.length > 0 && <button style={{marginLeft: 20}} className="btn btn-default" onClick={this.handleClearSelection}>
          Clear Selection
        </button>}
      </div>
    </div>
  }
}

class App extends React.Component {
  render() {
    return <div className="container">
      <div className="row header">
        <div className="col-md-12">
          <h1><a href="https://github.com/insin/react-filtered-multiselect">React &lt;FilteredMultiSelect/&gt;</a></h1>
          <p className="lead">A reusable React component for making and adding to selections using a filtered multi-select.</p>
        </div>
      </div>

      <hr/>

      <h2>Basic Selection</h2>
      <p>Select some ships from <a href="http://en.wikipedia.org/wiki/The_Culture">The Culture</a>.</p>
      <BasicSelection/>

      <hr/>

      <h2>Add &amp; Remove</h2>
      <p>Move items from one <code>&lt;FilteredMultiSelect/&gt;</code> to another and back again.</p>
      <AddRemoveSelection/>

      <hr/>

      <h2>Selection Only</h2>
      <p>Use a <code>showFilter={'{false}'}</code> prop to hide the filter input.</p>
      <NoFilter/>
    </div>
  }
}

render(<App/>, document.querySelector('#demo'))
