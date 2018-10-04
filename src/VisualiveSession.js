import io from 'socket.io-client'

class VisualiveSession {
  constructor() {
    this.socket = io.connect('https://apistage.visualive.io')

    this.clients = []
    this.callbacks = Object.keys(VisualiveSession.actions).reduce(
      (acc, cur) => {
        return Object.assign({}, { [cur]: [] })
      },
      {}
    )
  }

  join(userInfo) {
    this.socket.emit(VisualiveSession.actions.USER_JOINED, userInfo)
  }

  emit(key, data) {}

  on(key, callback) {
    this.socket.on(key, data => {
      callback(data)
    })
  }

  sendTextMessage(textMessage) {
    this.socket.emit(VisualiveSession.actions.TEXT_MESSAGE, {
      payload: textMessage,
    })
  }
}

VisualiveSession.actions = {
  USER_JOINED: 'user-joined',
  TEXT_MESSAGE: 'text-message',
  COMMAND: 'command',
}

export default VisualiveSession
