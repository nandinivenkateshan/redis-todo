import React from 'react'

function TextArea (props) {
  const handleUpdate = (key, event) => props.onUpdate(key, event)
  const handleBlur = (key, event) => props.onBlur(key, event)
  return (
    <textarea
      name='textarea' value={props.item.text}
      onChange={event => handleUpdate(props.item.id, event)}
      className={props.className}
      onBlur={event => handleBlur(props.item.id, event)}
      id='focus'
    >{props.item.text}
    </textarea>
  )
}

export default TextArea
