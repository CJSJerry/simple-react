import React ,{ useState, useRef, useEffect } from 'react'; /*hooks in curly*/
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid'; /*npm i uuid*/ /*see comments*/

const LOCAL_STORAGE_KEY = 'todoAPP.todos'

function App() {
const [todos, setTodos] = useState([])
const todoNameRef = useRef()
useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if (storedTodos) setTodos( prevTodos => [...prevTodos, ...storedTodos] )
}, []) /*Empty array since we only want this to run when loaded, once *//*see comments*/
useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos]) /*When [todos] changes, run useEffect to save the changed [todos]*/

function toggleTodo(id) {
  const newTodos = [...todos] /*a copy of the current [todos]... NEVER modify a state variable in REACT*/
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}

const handleAddTodo = (e) => {
  const name = todoNameRef.current.value
  if (name == '') return 
  //console.log(name)
  setTodos(prevTodos => {
    return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
  })
  todoNameRef.current.value = null
} 
/*if not arrow function:
function handleAddTodo(e) {
  const name = todoNameRef.current.value
  if (name === '') return
  console.log(name)
  ...
}*/

function handleClearTodos() {
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}
  return (
    <>
      <TodoList todos = {todos} toggleTodo = {toggleTodo}/> {/*this is a prop passing to TodoList.js*/}
      <input ref={todoNameRef} typr='text' />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
