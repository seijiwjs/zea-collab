import io from 'socket.io-client'
import shortid from 'shortid'

class VisualiveSession {
  constructor(userId) {
    this.socket = io.connect(
      'https://apistage.visualive.io',
      { 'sync disconnect on unload': true }
    )
    this.userId = userId
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
    const myPhoneNumber = this.fullRoomId + this.userId
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
      const { type: messageType } = message
      const callbacks = this.callbacks[messageType]
      if (callbacks) {
        callbacks.forEach(callback => callback(message))
      }
    })

    /*
     * Socket actions.
     */
    this.socket.emit(VisualiveSession.actions.JOIN_ROOM, {
      payload: {
        roomId: this.fullRoomId,
        userId: this.userId,
      },
    })

    this.socket.on(VisualiveSession.actions.USER_JOINED, message => {
      const { userId: newUserId } = message.payload
      console.info('User joined:', newUserId)
      this.socket.emit(VisualiveSession.actions.PING_ROOM, {
        payload: {
          roomId: this.fullRoomId,
          userId: this.userId,
        },
      })
    })

    this.socket.on(VisualiveSession.actions.USER_PING, message => {
      const { userId: newUserId } = message.payload
      console.info('Ping from:', newUserId)

      const roomMatePhoneNumber = this.fullRoomId + newUserId
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
      }&token=${this.userId}`
    )

    return this.roomId
  }

  pub(message) {
    this.phone.send(Object.assign(message, { userId: this.userId }))
  }

  sub(messageType, callback) {
    const callbacks = this.callbacks[messageType]
    this.callbacks[messageType] = callbacks
      ? callbacks.concat(callback)
      : [callback]
  }

  sendUserJoined(userId) {
    this.pub({
      type: VisualiveSession.actions.USER_JOINED,
      payload: {
        userId,
      },
    })
  }

  sendTextMessage(text) {
    this.pub({
      type: VisualiveSession.actions.TEXT_MESSAGE,
      payload: {
        text,
      },
    })
  }

  sendCommand(command) {
    this.pub({
      type: VisualiveSession.actions.COMMAND,
      payload: {
        command,
      },
    })
  }
}

VisualiveSession.actions = {
  JOIN_ROOM: 'join-room',
  PING_ROOM: 'ping-room',
  USER_PING: 'user-ping',
  USER_JOINED: 'user-joined',
  USER_LEFT: 'user-left',
  TEXT_MESSAGE: 'text-message',
  COMMAND: 'command',
}

export default VisualiveSession
