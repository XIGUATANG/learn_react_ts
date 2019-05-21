import React, { Component } from 'react'

interface TodoItemProps {
  onToggle: () => void
  onRemove: () => void
  completed: boolean
  text: string
}

export default class TodoItem extends Component<TodoItemProps, {}> {
  // const checkedProp = completed ? { checked: true } : {}
  constructor(props: TodoItemProps) {
    super(props)
  }
  shouldComponentUpdate(nextProps: TodoItemProps) {
    return nextProps.text !== this.props.text || nextProps.completed !== this.props.completed
  }
  render() {
    const { onToggle, onRemove, completed, text } = this.props
    return (
      <li
        className="todo-item"
        style={{
          textDecoration: completed ? 'line-through' : 'none'
        }}
      >
        <input name="text" className="toggle" type="checkbox" checked={completed} readOnly onChange={onToggle} />
        <label htmlFor="text" className="text">
          {text}
        </label>

        <button className="remove" onClick={onRemove}>
          ×
        </button>
      </li>
    )
  }
}
// export default TodoItem
