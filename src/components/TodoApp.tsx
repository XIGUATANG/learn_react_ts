import React from 'react'
import { view as Todos } from './todos/index'
import { view as Filter } from './filter/index'

let TodoApp: React.FC = () => {
  return (
    <div>
      <Todos />
      <Filter />
    </div>
  )
}

export default TodoApp
