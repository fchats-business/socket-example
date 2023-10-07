const express = require('express')
const { createServer } = require('http')
const path = require('path')
const { Server } = require('socket.io')
const config = require('../config')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const online = []

app.use(express.static(path.join(__dirname, '../views')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views'))
})

io.on('connection', (socket) => {
  console.log('connected clients', io.engine.clientsCount)
  console.log('socket ID', socket.id)

  online.push(socket.id)

  socket.on('disconnect', () => {
    console.log('The socket disconnect', socket.id)
  })

  socket.conn.once('upgrade', () => {
    console.log('Have from HTTP Long-Polling to', socket.conn.transport.name)
  })

  socket.emit('welcome', 'Now you are connected!')

  socket.on('server', (clientID) => {
    console.log('Emit client:', clientID)
  })

  socket.on('drag', (position) => {
    socket.broadcast.emit('draw', position)
  })

  // broadcast to all
  io.emit('everyone', socket.id)

  // cast one
  socket.on('last', (message) => {
    const lastSocket = online[online.length - 1]
    io.to(lastSocket).emit('hello', message)
  })

  socket.emit('on', 'some message on')
  socket.emit('on', 'some message on')
  socket.emit('on', 'some message on')

  socket.emit('once', 'some message once')
  socket.emit('once', 'some message once')
  socket.emit('once', 'some message once')

  socket.emit('off', 'some message off')

  setTimeout(() => {
    socket.emit('off', 'some message off')
  }, 3000)
})

httpServer.listen(config.PORT, () => {
  console.log(`🚀 ~ listening to port http:localhost:${config.PORT}`)
})
