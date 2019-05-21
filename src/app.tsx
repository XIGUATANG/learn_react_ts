import ReactDOM from 'react-dom'
import React from 'react'

import { Provider } from 'react-redux'

import store from './store/Store'
import TodoApp from './components/TodoApp'

import ScrollWrapper from './components/scrollWrapper/scrollWrapper'
console.log(store)

ReactDOM.render(
  <Provider store={store}>
    <ScrollWrapper />
  </Provider>,
  document.getElementById('root')
)
