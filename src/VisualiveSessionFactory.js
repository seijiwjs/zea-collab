import VisualiveSession from './VisualiveSession'

let SOCKET_SERVER_URL = (process.env.NODE_ENV==='local_stage' || process.env.NODE_ENV==='production') ? 'https://websocket-staging.zea.live' : 'http://localhost:8081'

class VisualiveSessionFactory {
  static setSocketURL(socketUrl) {
    SOCKET_SERVER_URL = socketUrl
  }

  static getInstance(user, projectId, fileId, roomId) {
    if (!this.visualiveSession) {
      this.visualiveSession = new VisualiveSession(user, SOCKET_SERVER_URL)
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
