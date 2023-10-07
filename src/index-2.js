const express = require('express')
const { createServer } = require('http')
const path = require('path')
const { Server } = require('socket.io')
const config = require('../config')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static(path.join(__dirname, '../views')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views'))
})

io.on('connection', (socket) => {
  socket.connectedRoom = ''

  socket.on('connect_to_room', (room) => {
    socket.leave(socket.connectedRoom)
    switch (room) {
      case 'room1':
        socket.join(room)
        socket.connectedRoom = room
        break
      case 'room2':
        socket.join(room)
        socket.connectedRoom = room
        break
      case 'room3':
        socket.join(room)
        socket.connectedRoom = room
        break
    }
  })

  socket.on('message', (message) => {
    const room = socket.connectedRoom
    io.to(room).emit('message_receive', {
      message,
      room
    })
  })
})

httpServer.listen(config.PORT, () => {
  console.log(`🚀 ~ listening to port http:localhost:${config.PORT}`)
})
