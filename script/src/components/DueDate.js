import React from 'react'
import './dueDate.css'

function DueDate (props) {
  const { item: { id } } = props
  const handleDueDate = id => props.onDueDate(id)

  return (
    <button className='due-date-btn' onClick={() => handleDueDate(id)}>Due-Date</button>
  )
}

export default DueDate
