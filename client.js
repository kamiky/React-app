var socket = require('socket.io-client')('http://localhost:8080')
socket.on('connect', function () {
  console.log('client connected ...')
  console.log('sending \'toto\' !')
  socket.send('message', 'toto')
})
socket.on('message', function (data) {
  console.log('receive message : ', data)
})
socket.on('disconnect', function () {
  console.log('disconnect')
})
