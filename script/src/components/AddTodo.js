import React from 'react'
import Filter from './Filter'
import './addTodo.css'

function AddTodo (props) {
  const { input, onInput, onSubmit, onUpdatedFilter } = props
  const handleInput = event => onInput(event)

  const handleSubmit = event => onSubmit(event)

  const handleFilterTodo = filter => onUpdatedFilter(filter)

  return (
    <header className='header'>
      <h1>Todos</h1>
      <form onSubmit={event => handleSubmit(event)} className='form'>
        <input
          type='text' className='input-box' placeholder='Enter a Task'
          value={input} onChange={event => handleInput(event)}
        />
        <button className='add-btn'>Add</button>
        <Filter onUpdatedFilter={(filter) => handleFilterTodo(filter)} />
      </form>
    </header>
  )
}

export default AddTodo
