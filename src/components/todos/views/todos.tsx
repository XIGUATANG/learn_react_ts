import React from 'react'
import AddTodo from './addTodo'
import TodoList from './todoList'

import './style.css'

let Todo: React.FC = () => {
  return (
    <div className="todos">
      <AddTodo />
      <TodoList />
    </div>
  )
}
export default Todo
