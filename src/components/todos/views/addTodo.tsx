import React, { Component, Dispatch, FormEvent } from 'react'
import { connect } from 'react-redux'

import { addTodo, Action } from '../actions'

interface AddTodoProtype {
  onAdd(value: string): void
}

interface State {}

class AddTodoComponent extends React.Component<AddTodoProtype, State> {
  input?: HTMLInputElement
}

class AddTodo extends AddTodoComponent {
  constructor(props: AddTodoProtype, context: React.Context<{}>) {
    super(props, context)

    this.onSubmit = this.onSubmit.bind(this)
    this.refInput = this.refInput.bind(this)
  }

  onSubmit(ev: FormEvent) {
    ev.preventDefault()

    const input = this.input
    if (input) {
      if (!input.value.trim()) {
        return
      }

      this.props.onAdd(input.value)
      input.value = ''
    }
  }

  refInput(node: HTMLInputElement) {
    this.input = node
  }

  render() {
    return (
      <div className="add-todo">
        <form onSubmit={(e: FormEvent) => this.onSubmit(e)}>
          <input className="new-todo" ref={this.refInput} />
          <button className="add-btn" type="submit">
            添加
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    onAdd: (text: string) => {
      dispatch(addTodo(text))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AddTodo)
