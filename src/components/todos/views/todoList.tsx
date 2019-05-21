import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
//import {bindActionCreators} from 'redux';
import TodoItem from './todoItem'
import { toggleTodo, removeTodo, Action } from '../actions'
import { FilterTypes } from '../../constants'
import { TodoItem as TodoItemData } from '../reducer'

import { State } from '../../../store/Store'

interface TodoListProps {
  todos: TodoItemData[]
  onToggleTodo: (id: number) => void
  onRemoveTodo: (id: number) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo, onRemoveTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map(item => (
        <TodoItem key={item.id} text={item.text} completed={item.completed} onToggle={() => onToggleTodo(item.id)} onRemove={() => onRemoveTodo(item.id)} />
      ))}
    </ul>
  )
}

const selectVisibleTodos = (todos: TodoItemData[], filter: FilterTypes) => {
  switch (filter) {
    case FilterTypes.ALL:
      return todos
    case FilterTypes.COMPLETED:
      return todos.filter(item => item.completed)
    case FilterTypes.UNCOMPLETED:
      return todos.filter(item => !item.completed)
    default:
      throw new Error('unsupported filter')
  }
}

const mapStateToProps = (state: State) => {
  return {
    todos: selectVisibleTodos(state.todos, state.filter)
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    onToggleTodo: (id: number) => {
      dispatch(toggleTodo(id))
    },
    onRemoveTodo: (id: number) => {
      dispatch(removeTodo(id))
    }
  }
}

/*
const mapDispatchToProps = (dispatch) => bindActionCreators({
  onToggleTodo: toggleTodo,
  onRemoveTodo: removeTodo
}, dispatch);
*/

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
