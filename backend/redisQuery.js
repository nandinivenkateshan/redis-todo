var redis = require('redis')
var client = redis.createClient()

client.on('connect', function () {
  console.log('Redis is ready')
})

client.on('error', function () {
  console.log('Error in Redis')
})

function addTodo (req, res) {
  const { id, complete, note, noteValue, dueDate, updateDate, saveDate } = req.body
  client.hmset(id, 'complete', complete, 'note', note, 'noteValue', noteValue,
    'dueDate', dueDate, 'updateDate', updateDate, 'saveDate', saveDate,
    function (err, reply) {
      if (err) console.log('Error while adding todo', err)
      console.log(reply)
    })
  client.hgetall(id, function (err, reply) {
    if (err) console.log('Error in fetching', err)
    // console.log(id)
    res.status(200).json(reply)
  })
}

module.exports = {
  addTodo
}
