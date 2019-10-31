import React from 'react'
import './popUpNote.css'

function PopUpNote (props) {
  // console.log(props)
  const { item: { id }, onPopUpNote, show, onClose } = props
  const handlePopUpNote = (event, id) => {
    onPopUpNote(event, id)
  }

  const handleCloseNote = () => onClose()

  return (
    props.show && (
      <div className='pop-up-note'>
        <textarea value={props.item.noteValue} onChange={(event) => handlePopUpNote(event, id)} className='textarea-note'>{props.item.noteValue}</textarea>
        <button className='save-btn' onClick={() => handleCloseNote()}>Save</button>
      </div>)
  )
}
export default PopUpNote
