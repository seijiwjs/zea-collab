import VisualiveSession from './VisualiveSession'

const SOCKET_SERVER_URL =
  process.env.NODE_ENV === 'local_stage' ||
  process.env.NODE_ENV === 'production'
    ? 'https://websocket-staging.zea.live'
    : 'http://localhost:8081'

class VisualiveSessionFactory {
  static setSocketURL(socketUrl) {
    this.socketUrl = socketUrl
  }

  static getInstance(user, projectId, fileId, roomId) {
    if (!this.visualiveSession) {
      const socketUrl = this.socketUrl || SOCKET_SERVER_URL
      this.visualiveSession = new VisualiveSession(user, socketUrl)
    }

    if (
      !this.visualiveSession.isJoiningTheSameRoom(projectId, fileId, roomId)
    ) {
      this.visualiveSession.joinRoom(projectId, fileId, roomId)
    }

    return this.visualiveSession
  }

  static getCurrentSession() {
    return this.visualiveSession
  }
}

export default VisualiveSessionFactory
