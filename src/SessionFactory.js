import Session from './Session'

const SOCKET_SERVER_URL =
  process.env.NODE_ENV === 'local_stage' ||
  process.env.NODE_ENV === 'production'
    ? 'https://websocket-staging.zea.live'
    : 'http://localhost:8081'

class SessionFactory {
  static setSocketURL(socketUrl) {
    this.socketUrl = socketUrl
  }

  static getInstance(user, projectId, fileId, roomId) {
    if (!this.session) {
      const socketUrl = this.socketUrl || SOCKET_SERVER_URL
      this.session = new Session(user, socketUrl)
    }

    if (
      !this.session.isJoiningTheSameRoom(projectId, fileId, roomId)
    ) {
      this.session.joinRoom(projectId, fileId, roomId)
    }

    return this.session
  }

  static getCurrentSession() {
    return this.session
  }
}

export default SessionFactory
