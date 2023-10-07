const socket = io()

// button rooms
const connectRoom1 = document.getElementById('connetRoom1')
const connectRoom2 = document.getElementById('connetRoom2')
const connectRoom3 = document.getElementById('connetRoom3')

// events
connectRoom1.addEventListener('click', () => {
  socket.emit('connect_to_room', 'room1')
})

connectRoom2.addEventListener('click', () => {
  socket.emit('connect_to_room', 'room2')
})

connectRoom3.addEventListener('click', () => {
  socket.emit('connect_to_room', 'room3')
})

// send messages
const sendMessage = document.getElementById('sendMessage')
sendMessage.addEventListener('click', () => {
  const message = prompt('Escribe tu mensaje')
  if (!message) {
    return
  }
  socket.emit('message', message)
})

// message receive

socket.on('message_receive', ({ message, room }) => {
  console.log(message, room)
  const li = document.createElement('li')
  li.textContent = message
  document.getElementById(`${room}`).appendChild(li)
})
