const socket = io()

const checkSocketStatus = () => {
  console.log('Socket Status', socket.connected)
}

socket.on('connect', (s) => {
  console.log('Socket connected!', socket.id)
  checkSocketStatus()
})

socket.on('disconnect', () => {
  console.log('Socket disconnect!', socket.id)
})

socket.on('connect_error', () => {
  console.log('connection error')
})

socket.io.on('reconnect_attempt', () => {
  console.log('reconnecting...')
})

socket.io.on('reconnect', () => {
  console.log('reconnected!')
})

socket.on('welcome', (data) => {
  const status = document.getElementById('status')
  status.textContent = data
})

socket.on('everyone', (clientID) => {
  const items = document.getElementById('items')
  const item = document.createElement('li')
  item.textContent = clientID
  items.appendChild(item)
})

const broadcastButton = document.getElementById('broadcast')
broadcastButton.addEventListener('click', () => {
  socket.emit('server', socket.id)
})

const lastButton = document.getElementById('last')
lastButton.addEventListener('click', () => {
  socket.emit('last', `Hi ${socket.id}!`)
})

socket.on('hello', (message) => {
  console.log(message)
})

// on, once, off

// listening listen more than once
socket.on('on', (message) => {
  console.log('on =>', message)
})

// listen once
socket.once('once', (message) => {
  console.log('once =>', message)
})

// listen once and turn off
const fnOff = (message) => {
  console.log('once =>', message)
}

socket.on('off', fnOff)

setTimeout(() => {
  socket.off('off', fnOff)
}, 2000)
