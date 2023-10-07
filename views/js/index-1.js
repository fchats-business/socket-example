const socket = io()

const circle = document.getElementById('circle')

const drawCircle = ({ clientY, clientX }) => {
  circle.style.top = clientY
  circle.style.left = clientX
}

const drag = (e) => {
  const clientX = e.clientX + 'px'
  const clientY = e.clientY + 'px'
  drawCircle({ clientY, clientX })

  if (socket.connected) {
    socket.emit('drag', { clientX, clientY })
  }
}

socket.on('draw', ({ clientX, clientY }) => {
  drawCircle({ clientY, clientX })
})

document.addEventListener('mousedown', (e) => {
  document.addEventListener('mousemove', drag)
})

document.addEventListener('mouseup', () => {
  document.removeEventListener('mousemove', drag)
})
