import React from 'react' /*just type rfc (use function instead of const tho)*/

export default function Todo({ todo, toggleTodo }) {
  const handleTodoClick = () => {
    toggleTodo(todo.id)
  }
  return (
    <div>
        <label>
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
            {todo.name}
        </label>    
    </div>
  )
}
