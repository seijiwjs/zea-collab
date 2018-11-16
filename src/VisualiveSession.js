import io from 'socket.io-client'
import wildcardMiddleware from 'socketio-wildcard'
import shortid from 'shortid'

const private_actions = {
  JOIN_ROOM: 'join-room',
  PING_ROOM: 'ping-room',
  LEAVE_ROOM: 'leave-room',
}

class VisualiveSession {
  constructor(userData) {
    this.userData = userData
    this.users = {}
    this.userStreams = {}
    this.callbacks = {};

    this._prepareMediaStream()
  }

  stopCamera(publish=true) {
    this.stream.getVideoTracks()[0].enabled = false
    if(publish)
      this.pub(VisualiveSession.actions.USER_VIDEO_STOPPED, { } )
  }

  startCamera(publish=true) {
    this.stream.getVideoTracks()[0].enabled = true
    if(publish)
      this.pub(VisualiveSession.actions.USER_VIDEO_STARTED, { } )
  }

  muteAudio(publish=true) {
    this.stream.getAudioTracks()[0].enabled = false
    if(publish)
      this.pub(VisualiveSession.actions.USER_VIDEO_STOPPED, { } )
  }

  unmuteAudio(publish=true) {
    this.stream.getAudioTracks()[0].enabled = true
    if(publish)
      this.pub(VisualiveSession.actions.USER_AUDIO_STARTED, { } )
  }

  getVideoStream(userId) {
    return this.userStreams[userId]
  }

  setVideoStream(remoteStream, userId) {
    const video = document.createElement('video');
    video.srcObject = remoteStream
    this.userStreams[userId] = video;
    
    video.onloadedmetadata = e => {
      video.play()
    }
  } 

  joinRoom(projectId, fileId, roomId) {
    this.projectId = projectId
    this.fileId = fileId
    this.roomId = roomId

    this.fullRoomId = projectId + fileId + (roomId || '')

    /*
     * Phone actions.
     */
    const myPhoneNumber = `${this.fullRoomId}${this.userData.id}`
    console.info('myPhoneNumber:', myPhoneNumber)

    this.peer = new Peer(myPhoneNumber, {
      debug: 2,
    })

    // Receive calls.
    this.peer.on('call', call => {
      this._prepareMediaStream()
        .then(() => {
          call.answer(this.stream)
          call.on('stream', remoteStream => {
            const remoteUserId = call.peer.substring(call.peer.length - 16)
            
            this.setVideoStream(remoteStream, remoteUserId);
          })
        })
        .catch(err => {
          console.log('Failed to get local stream', err)
        })
    })

    /*
     * Socket actions.
     */
    this.leaveRoom()

    this.socket = io(
      'https://apistage.visualive.io',
      // 'http://localhost:7070',
      {
        'sync disconnect on unload': true,
        query: `userId=${this.userData.id}&roomId=${this.fullRoomId}`,
      }
    )

    const patch = wildcardMiddleware(io.Manager)
    patch(this.socket)

    // Emit all messages, except the private ones.
    this.socket.on('*', packet => {
      const [messageType, message] = packet.data
      if (messageType in private_actions) return
      this._emit(messageType, message.payload, message.userId)
    })

    window.addEventListener('beforeunload', () => {
      this.socket.emit(private_actions.LEAVE_ROOM, {
        payload: {
          userData: this.userData,
        },
      })
      this.socket.close()
    })

    this.socket.emit(private_actions.JOIN_ROOM, {
      payload: {
        userData: this.userData,
      },
    })

    this.socket.on(private_actions.JOIN_ROOM, message => {
      console.info(`${private_actions.JOIN_ROOM}:`, message)
      this.socket.emit(private_actions.PING_ROOM, {
        payload: {
          userData: this.userData,
        },
      })
      const { userData } = message.payload
      const roommatePhoneNumber = `${this.fullRoomId}${userData.id}`

      // Make call to the user who just joined the room.
      this._prepareMediaStream()
        .then(() => {
          const call = this.peer.call(roommatePhoneNumber, this.stream)
          call.on('stream', remoteStream => {
            this.setVideoStream(remoteStream, userData.id);
          })
        })
        .catch(err => {
          console.log('Failed to get local stream', err)
        })

      this._addUserIfNew(userData)
    })

    this.socket.on(private_actions.LEAVE_ROOM, message => {
      console.info(`${private_actions.LEAVE_ROOM}:`, message)
      const { userData } = message.payload
      const userId = userData.id
      if (userId in this.users) {
        delete this.users[userId]
        this._emit(VisualiveSession.actions.USER_LEFT, userData)
        return
      }
      console.warn('User not in room.')
    })

    this.socket.on(private_actions.PING_ROOM, message => {
      console.info(`${private_actions.PING_ROOM}:`, message)
      const { userData } = message.payload
      this._addUserIfNew(userData)
    })
  }

  _prepareMediaStream() {
    if(this.__streamPromise)
      return this.__streamPromise;
    this.__streamPromise = new window.Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: { width: 400, height: 300 },
        })
        .then(stream => {
          this.stream = stream
          this.stopCamera(false)
          this.muteAudio(false)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })

    return this.__streamPromise;
  }

  leaveRoom() {
    if (this.socket) {
      this.socket.close()
    }
    // Instruct all client code to cleanup session user data.
    this._emit(VisualiveSession.actions.LEFT_ROOM)
    this.users = {}
  }

  _addUserIfNew(userData) {
    if (!(userData.id in this.users)) {
      this.users[userData.id] = userData

      this._emit(VisualiveSession.actions.USER_JOINED, userData)
    }
  }

  createRoom() {
    this.roomId = shortid.generate()
    this.joinRoom(this.projectId, this.fileId, this.roomId)

    window.history.pushState(
      null,
      null,
      `?project-id=${this.projectId}&file-id=${this.fileId}&room-id=${
        this.roomId
      }`
    )

    return this.roomId
  }

  getUsers() {
    return this.users
  }

  getUser(id) {
    return this.users[id]
  }

  pub(messageType, payload) {
    this.socket.emit(messageType, {
      userId: this.userData.id,
      payload,
    })
  }

  _emit(messageType, payload, userId) {
    const callbacks = this.callbacks[messageType]
    if (callbacks) {
      callbacks.forEach(callback => callback(payload, userId))
    }
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
  USER_VIDEO_STARTED: 'user-video-started',
  USER_VIDEO_STOPPED: 'user-video-stopped',
  USER_AUDIO_STARTED: 'user-audio-started',
  USER_AUDIO_STOPPED: 'user-audio-stopped',
  USER_LEFT: 'user-left',
  LEFT_ROOM: 'left-room',
  TEXT_MESSAGE: 'text-message',
  POSE_CHANGED: 'pose-message',
  COMMAND_ADDED: 'command-added',
  COMMAND_UPDATED: 'command-updated',
}

export default VisualiveSession
