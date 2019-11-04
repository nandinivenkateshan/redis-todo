import React from 'react'
import './delete.css'

function Delete (props) {
  const { id, onDelete } = props
  const handleDelete = id => onDelete(id)
  return (
    <button className='delete-btn' onClick={() => handleDelete(id)}>Delete</button>
  )
}

export default Delete
