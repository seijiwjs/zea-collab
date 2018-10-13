import io from 'socket.io-client'
import uuidv4 from 'uuid/v4'

class VisualiveSession {
  constructor() {
    this.callbacks = {}
  }

  join(sessionInfo) {
    const { projectId, fileId, roomId } = sessionInfo

    this.userId = sessionInfo.userId
    this.fullRoomId = `${projectId}${fileId}${roomId || ''}`

    this.phone = PHONE({
      media: { audio: false, video: false },
      number: this.fullRoomId,
      publish_key: 'pub-c-c632ffe7-eecd-4ad0-8cc2-6ecc47c17625',
      subscribe_key: 'sub-c-78f93af8-cc85-11e8-bbf2-f202706b73e5',
    })

    this.phone.ready(() => {
      this.phone.dial(this.fullRoomId)
      this.sendUserJoined(this.userId)
    })

    this.phone.message((session, message) => {
      const { type: messageType } = message
      const callbacks = this.callbacks[messageType]
      if (callbacks) {
        callbacks.forEach(callback => callback(message))
      }
    })
  }

  emit(message) {
    this.phone.send(Object.assign(message, { userId: this.userId }))
  }

  on(messageType, callback) {
    const callbacks = this.callbacks[messageType]
    this.callbacks[messageType] = callbacks
      ? callbacks.concat(callback)
      : [callback]
  }

  sendUserJoined(userId) {
    this.emit({
      type: VisualiveSession.actions.USER_JOINED,
      payload: {
        userId,
      },
    })
  }

  sendTextMessage(text) {
    this.emit({
      type: VisualiveSession.actions.TEXT_MESSAGE,
      payload: {
        text,
      },
    })
  }

  sendCommand(command) {
    this.emit({
      type: VisualiveSession.actions.COMMAND,
      payload: {
        command,
      },
    })
  }
}

VisualiveSession.actions = {
  USER_JOINED: 'user-joined',
  USER_LEFT: 'user-left',
  TEXT_MESSAGE: 'text-message',
  COMMAND: 'command',
}

export default VisualiveSession
