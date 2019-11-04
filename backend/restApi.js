const express = require('express')
// const bodyParser = require('body-parser')
const db = require('./redisQuery')
// var cors = require('cors')
const app = express()
const port = 3001
// app.use(cors)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(express.static('../script'))

app.use(express.json())

app.get('/todos', db.fetchTodo)
app.post('/todos', db.addTodo)
app.post('/todos/deleteList', db.deleteList)
app.post('/todos/checkBox', db.checkBox)
app.post('/todos/updateText', db.updateText)
app.post('/todos/updateNote', db.updateNote)
app.post('/todos/updateDate', db.updateDate)

app.listen(port, () => console.log(`App running on the port ${port}`))
