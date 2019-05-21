import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import { reducer as todoReducer } from '../components/todos/index'
import { reducer as filterReducer } from '../components/filter/index'

import { TodoItem } from '../components/todos/reducer'
import { FilterTypes } from '../components/constants'

export interface State {
  todos: TodoItem[]
  filter: FilterTypes
}

const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer
})

const middlewares = []
// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(require('redux-immutable-state-invariant')())
// }

const storeEnhancers = compose(applyMiddleware())

export default createStore(reducer, {}, storeEnhancers)
