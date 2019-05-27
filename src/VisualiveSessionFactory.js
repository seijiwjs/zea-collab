import VisualiveSession from './VisualiveSession'

class VisualiveSessionFactory {
  static getInstance(user, projectId, fileId, roomId) {
    if (!this.visualiveSession) {
      this.visualiveSession = new VisualiveSession(user)
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
