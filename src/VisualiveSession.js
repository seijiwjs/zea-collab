import io from 'socket.io-client'
import uuidv4 from 'uuid/v4'

// import { getCurrentUser } from './PlatformAPI.js';

class VisualiveSession {
  constructor(userId) {
    this.userId = userId
    this.callbacks = {}
  }

  joinRoom(sessionInfo) {
    const { projectId, fileId, roomId } = sessionInfo

    this.projectId = projectId
    this.fileId = fileId

    this.fullRoomId = `${projectId}${fileId}${roomId || ''}`

    this.phone = PHONE({
      media: { audio: false, video: false },
      number: this.fullRoomId,
      publish_key: 'pub-c-c632ffe7-eecd-4ad0-8cc2-6ecc47c17625',
      subscribe_key: 'sub-c-78f93af8-cc85-11e8-bbf2-f202706b73e5',
    })

    this.phone.ready(() => {
      this.phone.dial(this.fullRoomId)
      this.pub(VisualiveSession.actions.USER_JOINED, { userId: this.userId })

      // getCurrentUser()
      //   .then(currentUser => {
      //     this.pub(VisualiveSession.actions.USER_JOINED, currentUser)
      //   })
      //   .catch(() => {
      //     console.error('Error getting current user.');
      //   });

    })

    this.phone.message((session, message) => {
      const { type: messageType, userId } = message;
      if(userId != this.userId) {
        const callbacks = this.callbacks[messageType]
        if (callbacks) {
          callbacks.forEach(callback => callback(message.payload, message.userId))
        }
      }
    })
  }

  createRoom() {
    const uuid = uuidv4()
    const roomId = uuid.substring(0, uuid.indexOf('-'))
    this.joinRoom(this.projectId, this.fileId, roomId)
    window.history.pushState(
      null,
      null,
      `?project-id=${this.projectId}&file-id=${this.fileId}&room-id=${roomId}`
    )
    return roomId
  }

  pub(messageType, payload) {
    this.phone.send({ userId: this.userId, type:messageType, payload })
  }

  sub(messageType, callback) {
    const callbacks = this.callbacks[messageType]
    this.callbacks[messageType] = callbacks
      ? callbacks.concat(callback)
      : [callback]
  }
}

VisualiveSession.actions = {
  USER_JOINED: 'user-joined',
  USER_LEFT: 'user-left',
  TEXT_MESSAGE: 'text-message',
  POSE_CHANGED: 'pose-message',
  COMMAND_ADDED: 'command-added',
  COMMAND_UPDATED: 'command-updated',
}

export default VisualiveSession
