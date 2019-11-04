import React, { useState, useEffect } from 'react'
import AddTodo from '../addTodo/AddTodo'
import Todo from '../todo/Todo'
import PopUpNote from '../popUp/PopUpNote'
import PopUpDate from '../popUp/PopUpDate'
import './style.css'

function TodoApp () {
  const [input, setInput] = useState('')
  const [items, setItem] = useState([])
  const [showNote, setCloseNote] = useState(true)
  const [showDate, setCloseDate] = useState(true)
  const [filteredVal, setFilter] = useState(null)

  useEffect(() => {
    async function fetchData () {
      const url = await fetch('http://localhost:3001/todos')
      let items = await url.json()
      items = items.map(item => {
        return {
          id: Number(item.id),
          text: item.text,
          isComplete: JSON.parse(item.isComplete),
          noteValue: item.noteValue,
          updateDate: item.updateDate,
          isSaveDate: JSON.parse(item.isSaveDate)
        }
      })
      setItem(items)
    }
    fetchData()
  }, [])

  async function addToDb (url, data) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    await response.json()
  }

  const handleInput = event => setInput(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()
    const item = {
      id: Date.now(),
      text: input,
      isComplete: false,
      isNote: false,
      noteValue: '',
      isDueDate: false,
      updateDate: '',
      isSaveDate: false
    }
    const str = item.text.trim()
    if (str === '') alert('Enter the values')
    else {
      addToDb('http://localhost:3001/todos', item)
      setItem([item, ...items])
    }
    setInput('')
  }

  const handleDelete = key => {
    const item = items.filter(item => item.id !== key)
    addToDb('http://localhost:3001/todos/deleteList', { key })
    setItem(item)
  }

  const handleCheckBox = key => {
    const newItems = items.map(item => {
      if (item.id === key) {
        item.isComplete = !item.isComplete
        return item
      }
      return item
    })
    addToDb('http://localhost:3001/todos/checkBox', { key })
    setItem(newItems)
  }

  const handleUpdate = (key, event) => {
    const newItems = items.map(item => {
      if (item.id === key) {
        item.text = event.target.value
        return item
      }
      return item
    })
    setItem(newItems)
  }

  const handleBlur = (key, event) => {
    items.map(item => {
      if (item.id === key) {
        if (item.text === '') {
        //  alert('enter')
          const textarea = document.getElementById('focus')
          textarea.focus()
        }
      }
    })
    addToDb('http://localhost:3001/todos/updateText', items)
  }

  const handleNote = key => {
    setCloseNote(true)
    const newItems = items.map(item => {
      if (item.id === key) {
        item.isNote = true
        return item
      } else {
        item.isNote = false
        return item
      }
    })
    setItem(newItems)
  }

  const handlePopUpNote = (event, id) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        item.noteValue = event.target.value
        return item
      }
      return item
    })
    setItem(newItems)
  }

  const handleDueDate = key => {
    setCloseDate(true)
    const newItems = items.map(item => {
      if (item.id === key) {
        item.isDueDate = true
        return item
      } else {
        item.isDueDate = false
        return item
      }
    })
    setItem(newItems)
  }

  const handleUpdateDate = (event, key) => {
    const newItems = items.map(item => {
      if (item.id === key) {
        item.updateDate = event.target.value
          .split('-')
          .reverse()
          .join('-')
        return item
      }
      return item
    })
    setItem(newItems)
  }

  const handleSaveDate = id => {
    const newItems = items.map(item => {
      if (item.id === id) {
        item.isSaveDate = true
        return item
      }
      return item
    })
    setCloseDate(false)
    addToDb('http://localhost:3001/todos/updateDate', newItems)
    setItem(newItems)
  }

  const handleNoDate = id => {
    const newItems = items.map(item => {
      if (item.id === id) {
        item.updateDate = ''
        return item
      }
      return item
    })
    setCloseDate(false)
    setItem(newItems)
  }

  const handleSaveNote = () => {
    addToDb('http://localhost:3001/todos/updateNote', items)
    setCloseNote(false)
  }

  const handleCloseDate = () => setCloseDate(false)

  const handleFilterTodo = val => {
    if (val === 'Completed') setFilter(items.filter(item => item.isComplete))
    if (val === 'Pending') setFilter(items.filter(item => !item.isComplete))
    if (val === 'All') setFilter(null)
  }

  return (
    <main>
      <AddTodo
        input={input}
        onInput={event => handleInput(event)}
        onSubmit={event => handleSubmit(event)}
        onUpdatedFilter={filteredVal => handleFilterTodo(filteredVal)}
      />
      <ul>
        <Todo
          items={filteredVal || items}
          onDelete={key => handleDelete(key)}
          onCheckBox={key => handleCheckBox(key)}
          onUpdate={(key, event) => handleUpdate(key, event)}
          onBlur={(key, event) => handleBlur(key, event)}
          onNote={key => handleNote(key)}
          onDueDate={key => handleDueDate(key)}
        />
      </ul>

      {items.map(item => {
        return (
          item.isNote && (
            <PopUpNote
              key={item.id}
              item={item}
              onPopUpNote={(event, id) => handlePopUpNote(event, id)}
              show={showNote}
              onSave={() => handleSaveNote()}
            />
          )
        )
      })}
      {items.map(item => {
        return (
          item.isDueDate && (
            <PopUpDate
              key={item.id}
              id={item.id}
              onUpdateDate={(event, id) => handleUpdateDate(event, id)}
              date={item.updateDate}
              onSaveDate={id => handleSaveDate(id)}
              show={showDate}
              onCloseDate={() => handleCloseDate()}
              onNoDate={id => handleNoDate(id)}
            />
          )
        )
      })}
    </main>
  )
}

export default TodoApp
