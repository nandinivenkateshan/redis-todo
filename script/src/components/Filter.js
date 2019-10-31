import React, { useState } from 'react'
import './filter.css'

function Filter (props) {
  const [filter, setTask] = useState('All')
  const handleUpdatedFilter = event => {
    setTask(event.target.value)
    props.onUpdatedFilter(event.target.value)
  }

  return (
    <select
      className='select' value={filter}
      onChange={event => handleUpdatedFilter(event)}
      filteredval={filter}
    >
      <option value='All'>All</option>
      <option value='Completed'>Completed</option>
      <option value='Pending'>Pending</option>
    </select>
  )
}

export default Filter
