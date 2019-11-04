import React from 'react'
import './popUpNote.css'

function PopUpNote (props) {
  // console.log(props)
  const { item: { id }, onPopUpNote, show, onSave } = props
  const handlePopUpNote = (event, id) => {
    onPopUpNote(event, id)
  }

  const handleSaveNote = () => onSave()

  return (
    show && (
      <div className='pop-up-note'>
        <textarea value={props.item.noteValue} onChange={(event) => handlePopUpNote(event, id)} className='textarea-note'>{props.item.noteValue}</textarea>
        <button className='save-btn' onClick={() => handleSaveNote()}>Save</button>
      </div>)
  )
}
export default PopUpNote
