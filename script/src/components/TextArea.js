import React from 'react'
import './textArea.css'

function TextArea (props) {
  const handleUpdate = (key, event) => props.onUpdate(key, event)
  return (
    <textarea
      name='textarea' value={props.item.text}
      onChange={(event) => handleUpdate(props.item.id, event)}
      className={props.className}
    >{props.item.text}
    </textarea>
  )
}

export default TextArea
