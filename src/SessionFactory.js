import Session from './Session'

class SessionFactory {
  static setSocketURL(socketUrl) {
    this.socketUrl = socketUrl
  }

  static getInstance(user, projectId, fileId, roomId) {
    if (!this.session) {
      if (!this.socketUrl) {
        throw new Error('Missing #socketUrl. Call #setSocketURL first.')
      }

      this.session = new Session(user, this.socketUrl)
    }

    if (!this.session.isJoiningTheSameRoom(projectId, fileId, roomId)) {
      this.session.joinRoom(projectId, fileId, roomId)
    }

    return this.session
  }

  static getCurrentSession() {
    return this.session
  }
}

export default SessionFactory
