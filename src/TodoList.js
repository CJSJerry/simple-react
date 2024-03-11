import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo }) { /*this is a prop from app.js*/
  return (
    todos.map(todo => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} /> /*passing down the props*/
    })
  )
}
