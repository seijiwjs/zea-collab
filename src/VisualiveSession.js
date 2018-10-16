import io from 'socket.io-client'
import shortid from 'shortid'

// import { getCurrentUser } from './PlatformAPI.js';

class VisualiveSession {
  constructor(token, userData) {
    this.token = token
    this.userData = userData

    this.socket = io.connect(
      'https://apistage.visualive.io',
      { 'sync disconnect on unload': true }
    )
    this.callbacks = {}
    this.roommatesIds = []
  }

  joinRoom(projectId, fileId, roomId) {
    this.projectId = projectId
    this.fileId = fileId
    this.roomId = roomId

    this.fullRoomId = projectId + fileId + (roomId || '')

    /*
     * Phone actions.
     */
    const myPhoneNumber = this.fullRoomId + this.userData.id
    console.info('myPhoneNumber:', myPhoneNumber)
    this.phone = PHONE({
      media: { audio: false, video: false },
      number: myPhoneNumber,
      publish_key: 'pub-c-c632ffe7-eecd-4ad0-8cc2-6ecc47c17625',
      subscribe_key: 'sub-c-78f93af8-cc85-11e8-bbf2-f202706b73e5',
    })

    this.phone.receive(function(session) {
      session.connected(function(session) {
        console.info('Received call from:', session.number)
        const $mediaWrapper = document.getElementById('mediaWrapper')
        $mediaWrapper.appendChild(session.video)
      })
    })

    this.phone.message((session, message) => {
      const { type: messageType, userId } = message
      if (userId != this.userData.id) {
        const callbacks = this.callbacks[messageType]
        if (callbacks) {
          callbacks.forEach(callback =>
            callback(message.payload, message.userId)
          )
        }
      }
    })

    /*
     * Socket actions.
     */
    this.socket.emit(VisualiveSession.actions.JOIN_ROOM, {
      payload: {
        roomId: this.fullRoomId,
        userData: this.userData,
      },
    })

    // getCurrentUser()
    //   .then(currentUser => {
    //     this.pub(VisualiveSession.actions.USER_JOINED, currentUser)
    //   })
    //   .catch(() => {
    //     console.error('Error getting current user.');
    //   });

    this.socket.on(VisualiveSession.actions.USER_JOINED, message => {
      console.info('User joined:', message.payload)
      this.socket.emit(VisualiveSession.actions.PING_ROOM, {
        payload: {
          roomId: this.fullRoomId,
          userId: this.userData.id,
        },
      })
    })

    this.socket.on(VisualiveSession.actions.USER_PING, message => {
      console.info('Ping from:', message.payload)

      const roomMatePhoneNumber = this.fullRoomId + message.payload.user.id
      this.phone.ready(() => {
        this.phone.dial(roomMatePhoneNumber)
      })
    })
  }

  createRoom() {
    this.roomId = shortid.generate()
    this.joinRoom(this.projectId, this.fileId, this.roomId)

    window.history.pushState(
      null,
      null,
      `?project-id=${this.projectId}&file-id=${this.fileId}&room-id=${
        this.roomId
      }&token=${this.token}`
    )

    return this.roomId
  }

  pub(messageType, payload) {
    this.phone.send({ userId: this.userData.id, type: messageType, payload })
  }

  sub(messageType, callback) {
    const callbacks = this.callbacks[messageType]
    this.callbacks[messageType] = callbacks
      ? callbacks.concat(callback)
      : [callback]
  }
}

VisualiveSession.actions = {
  JOIN_ROOM: 'join-room',
  PING_ROOM: 'ping-room',
  USER_PING: 'user-ping',
  USER_JOINED: 'user-joined',
  USER_LEFT: 'user-left',
  TEXT_MESSAGE: 'text-message',
  POSE_CHANGED: 'pose-message',
  COMMAND_ADDED: 'command-added',
  COMMAND_UPDATED: 'command-updated',
}

export default VisualiveSession
