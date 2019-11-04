import React from 'react'

function CheckBox (props) {
  const { id, isComplete, onCheckBox } = props
  const handleCheckBox = id => onCheckBox(id)

  return (
    <input type='checkbox' onChange={() => handleCheckBox(id)} checked={isComplete} />
  )
}

export default CheckBox
