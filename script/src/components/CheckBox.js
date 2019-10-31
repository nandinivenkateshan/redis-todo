import React from 'react'

function CheckBox (props) {
  const { id, onCheckBox } = props
  const handleCheckBox = id => onCheckBox(id)

  return (
    <input type='checkbox' onChange={() => handleCheckBox(id)} />
  )
}

export default CheckBox
