const express = require('express')
const { createServer } = require('http')
const path = require('path')
const { Server } = require('socket.io')
const { instrument } = require("@socket.io/admin-ui")
const config = require('../config')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  }
})
instrument(io, {
  auth: {
    type: "basic",
    username: "admin",
    password: "$2a$12$JF8RaW1wR1ubGUBhlZNFTOsgpwybi6yyiWoS3uBJiHkxcGMlCBpVK" //admin
  }
})

app.use(express.static(path.join(__dirname, '../views')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views'))
})

const teachers = io.of('teachers')
const students = io.of('students')

teachers.on('connection', (socket) => {
  console.log(`${socket.id} is connected to the teachers chat`)
  socket.on('send_message', (data) => {
    teachers.emit('message_received', data)
  })
})

students.on('connection', (socket) => {
  console.log(`${socket.id} is connected to the students chat`)
  socket.on('send_message', (data) => {
    students.emit('message_received', data)
  })
})

httpServer.listen(config.PORT, () => {
  console.log(`🚀 ~ listening to port http:localhost:${config.PORT}`)
})
