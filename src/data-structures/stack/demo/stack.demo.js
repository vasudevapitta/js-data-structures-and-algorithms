import React, { Component, createRef } from 'react'
import { Stack } from '../stack'
import './stack.demo.css'

export default {
  title: 'Stack',
}

const Item = ({ value, className }) => {
  return <div className={className}>{value}</div>
}

const generateOddOrEvenClassName = (index, totalNumberOfItems) => {
  if (index % 2 === 0) {
    return totalNumberOfItems % 2 === 0 ? 'item alt' : 'item'
  } else {
    return totalNumberOfItems % 2 === 0 ? 'item' : 'item alt'
  }
}

class StackVisualizer extends Component {
  state = {
    stack: new Stack(),
    item: '',
  }

  textInputRef = createRef()

  handleItemChange = e => {
    this.setState({ item: e.target.value })
  }

  addItem = e => {
    e.preventDefault()
    const { stack, item } = this.state
    if (item) {
      stack.push(item)
      this.setState(
        { stack, item: '' },
        () => this.textInputRef.current && this.textInputRef.current.focus()
      )
    }
  }

  removeItem = () => {
    const { stack } = this.state
    stack.pop()
    this.setState({ stack })
  }

  clearStack = () => {
    const { stack } = this.state
    stack.clear()
    this.setState({ stack })
  }

  render() {
    const { stack, item } = this.state

    return (
      <div className="stackDemo">
        <h1>Stack Demo</h1>
        <form onSubmit={this.addItem}>
          <input
            value={item}
            onChange={this.handleItemChange}
            ref={this.textInputRef}
            className="newItemTextInput"
          />
          <button type="submit">Add Item to Stack</button>
          <br />
          <button type="button" onClick={this.removeItem}>
            Remove Item from Stack
          </button>
          <br />
          <button type="button" onClick={this.clearStack}>
            Clear Stack
          </button>
        </form>
        <div>
          <p>Stack Contents:</p>
          <div className="stackContainer">
            {stack.enumerate().map((value, index, allItems) => {
              return (
                <Item
                  value={value}
                  className={generateOddOrEvenClassName(index, allItems.length)}
                  key={index}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export const stackVisualizer = () => <StackVisualizer />