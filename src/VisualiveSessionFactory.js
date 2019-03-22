import VisualiveSession from './VisualiveSession'

class VisualiveSessionFactory {
  static getInstance(user, projectId, fileId, roomId) {
    if (!this.visualiveSession) {
      this.visualiveSession = new VisualiveSession(user)
      this.visualiveSession.joinRoom(projectId, fileId, roomId)
    }
    return this.visualiveSession
  }
}

export default VisualiveSessionFactory
