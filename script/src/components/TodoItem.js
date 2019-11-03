import React from 'react'
import './todoItem.css'
import Delete from './Delete'
import CheckBox from './CheckBox'
import TextArea from './TextArea'
import Note from './Note'

import DueDate from './DueDate'

function TodoItem (props) {
  const { className, item, onDelete, onCheckBox, onUpdate, onNote, onDueDate } = props
  const handleDelete = key => onDelete(key)

  const handleCheckBox = key => onCheckBox(key)

  const handleUpdate = (key, event) => onUpdate(key, event)

  const handleNote = (key) => onNote(key)

  const handleDueDate = key => onDueDate(key)

  return (
    <section className='items'>
      <CheckBox id={item.id} isComplete={item.isComplete} onCheckBox={key => handleCheckBox(key)} />
      <div className='show-input-date'>
        <TextArea item={item} className={className} onUpdate={(key, event) => handleUpdate(key, event)} />
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
