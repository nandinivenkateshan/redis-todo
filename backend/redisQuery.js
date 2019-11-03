var redis = require('redis')
var client = redis.createClient()

client.on('connect', function () {
  console.log('Redis is ready')
})

client.on('error', function () {
  console.log('Error in Redis')
})

let array = []

function addTodo (req, res) {
  const { id = 0, text = 'abc', isComplete = false, isNote = false, noteValue = '', isDueDate = false, updateDate = '', isSaveDate = false } = req.body
  client.hmset(id, 'id', id, 'text', text, 'isComplete', isComplete, 'isNote', isNote, 'noteValue', noteValue,
    'isDueDate', isDueDate, 'updateDate', updateDate, 'isSaveDate', isSaveDate,
    function (err, result) {
      if (err) console.log('Error while adding todo', err)
    })
  if (req.body.id !== 0) {
    client.hgetall(req.body.id, function (err, result) {
      array.unshift(result)
      if (err) console.log('Error in fetching', err)
    })
  }
}

function deleteList (req, res) {
  const { key } = req.body
  const items = array.filter(item => Number(item.id) !== key)
  array = items
}

function checkBox (req, res) {
  const { key } = req.body
  array.forEach(item => {
    if (Number(item.id) === key) {
      const isComplete = JSON.parse(item.isComplete)
      item.isComplete = !isComplete
    }
  })
}

function updateText (req, res) {
  array = req.body
}

function fetchTodo (req, res) {
  res.status(200).json(array)
}

module.exports = {
  addTodo,
  fetchTodo,
  deleteList,
  checkBox,
  updateText
}
