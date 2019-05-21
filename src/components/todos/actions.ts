import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actionTypes'

let nextTodoId = 0

export interface Action {
  type: string
  id?: number
  text?: string
}

interface ActionFunc {
  (param: any): Action
}

export const addTodo: ActionFunc = text => ({
  type: ADD_TODO,
  completed: false,
  id: nextTodoId++,
  text: text
})

export const toggleTodo: ActionFunc = id => ({
  type: TOGGLE_TODO,
  id: id
})

export const removeTodo: ActionFunc = id => ({
  type: REMOVE_TODO,
  id: id
})
