import React from 'react'
import './todoItem.css'
import Delete from '../buttons/Delete'
import CheckBox from '../buttons/CheckBox'
import TextArea from '../buttons/TextArea'
import Note from '../buttons/Note'

import DueDate from '../buttons/DueDate'

function TodoItem (props) {
  const { className, item, onDelete, onCheckBox, onUpdate, onBlur, onNote, onDueDate } = props
  const handleDelete = key => onDelete(key)

  const handleCheckBox = key => onCheckBox(key)

  const handleUpdate = (key, event) => onUpdate(key, event)

  const handleBlur = (key, event) => onBlur(key, event)

  const handleNote = (key) => onNote(key)

  const handleDueDate = key => onDueDate(key)

  return (
    <section className='items'>
      <CheckBox id={item.id} isComplete={item.isComplete} onCheckBox={key => handleCheckBox(key)} />
      <div className='show-input-date'>
        <TextArea
          item={item} className={className} onUpdate={(key, event) => handleUpdate(key, event)}
          onBlur={(key, event) => handleBlur(key, event)}
        />
        {item.isSaveDate && <label>{item.updateDate}</label>}
      </div>
      <div className='buttons'>
        <Delete id={item.id} onDelete={key => handleDelete(key)} />
        <Note id={item.id} onNote={key => handleNote(key)} />
        <DueDate item={item} onDueDate={key => handleDueDate(key)} />
      </div>
    </section>
  )
}

export default TodoItem
