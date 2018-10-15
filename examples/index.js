import { VisualiveSession } from '@visualive/collab'

const urlParams = new URLSearchParams(window.location.search)
const projectIdFromUrl = urlParams.get('project-id')
const fileIdFromUrl = urlParams.get('file-id')
const roomIdFromUrl = urlParams.get('room-id')
const tokenFromUrl = urlParams.get('token')

const $receivedMessages = document.getElementById('receivedMessages')
const $mediaWrapper = document.getElementById('mediaWrapper')

const visualiveSession = new VisualiveSession(tokenFromUrl)

visualiveSession.joinRoom({
  projectId: projectIdFromUrl,
  fileId: fileIdFromUrl,
  roomId: roomIdFromUrl,
})

document.formCreateRoom.addEventListener('submit', e => {
  const $form = e.target
  const roomId = visualiveSession.createRoom()
  $form.roomId.value = roomId

  e.preventDefault()
})

document.formSendMessage.addEventListener('submit', e => {
  const $form = e.target
  visualiveSession.sendTextMessage($form.messageToSend.value)

  e.preventDefault()
  $form.reset()
})

visualiveSession.sub(VisualiveSession.actions.TEXT_MESSAGE, message => {
  const p = document.createElement('p')
  p.innerHTML = `<strong>${message.userId}:</strong> ${message.payload.text}`
  $receivedMessages.appendChild(p)
})

visualiveSession.sub(VisualiveSession.actions.USER_JOINED, message => {
  const p = document.createElement('p')
  p.innerHTML = `<strong>(User Joined: ${message.userId})</strong>`
  $receivedMessages.appendChild(p)
})
