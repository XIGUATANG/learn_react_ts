import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actionTypes'

import { Action } from './actions'
export interface TodoItem {
  id: number
  text: string
  completed: boolean
}

let reducer = (state: TodoItem[] = [], action: Action) => {
  switch (action.type) {
    case ADD_TODO: {
      return [
        {
          id: action.id,
          text: action.text,
          completed: false
        },
        ...state
      ]
    }
    case TOGGLE_TODO: {
      return state.map(todoItem => {
        if (todoItem.id === action.id) {
          return { ...todoItem, completed: !todoItem.completed }
        } else {
          return todoItem
        }
      })
    }
    case REMOVE_TODO: {
      return state.filter(todoItem => {
        return todoItem.id !== action.id
      })
    }
    default: {
      return state
    }
  }
}

export default reducer
