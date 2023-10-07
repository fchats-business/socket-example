const user = prompt('whats is name')
const teachers = ['teacher', 'teacher1', 'teacher2']

const chatEl = document.getElementById('chat')
const namespaceEl = document.getElementById('namespaces')
const sendMessageButton = document.getElementById('sendMessage')

let socketNamespace, group
if (teachers.includes(user)) {
  socketNamespace = io('/teachers')
  group = 'teachers'
  namespaceEl.textContent = 'teachers'
} else {
  socketNamespace = io('/students')
  group = 'students'
  namespaceEl.textContent = 'students'
}

sendMessageButton.addEventListener('click', () => {
  const message = prompt('what is message')
  if (!message) {
    return
  }
  socketNamespace.emit('send_message', { message, user })
})

socketNamespace.on('message_received', ({ message, user }) => {
  const li = document.createElement('li')
  li.textContent = `${user}: ${message}`
  chatEl.appendChild(li)
})
