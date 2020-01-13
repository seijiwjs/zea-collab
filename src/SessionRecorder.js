// Function to download data to a file
function saveAs(data, filename, type) {
  var file = new Blob([data], { type: type })
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename)
  else {
    // Others
    var a = document.createElement('a'),
      url = URL.createObjectURL(file)
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(function() {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
  }
}

function genID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export default class SessionRecorder {
  constructor(session, actionRegistry) {
    this.session = session
    this.actionRegistry = actionRegistry
    this.__recordings = {}

    // TODO: Check for credentials on the user.
    if (self.origin.startsWith('https://localhost')) {
      const pictures = [
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
      ]

      const data = {}
      let presenter
      let pub
      let messages
      const start = () => {
        const picIndex = getRandomInt(pictures.length)
        presenter = {
          id: genID(),
          picture: pictures[picIndex],
          name: 'Presenter' + Object.keys(data).length,
        }

        messages = []
        let msg = {
          messageType: 'user-joined',
          payload: presenter,
        }
        let prev_t = performance.now()
        pub = this.session.pub
        this.session.pub = (messageType, payload) => {
          // Record the time since the previous
          // message and save it to the previous message.
          const t = performance.now()
          msg.ms = t - prev_t
          messages.push(msg)
          msg = {
            messageType,
            payload,
          }
          prev_t = t
          pub.call(this.session, messageType, payload)
        }
      }

      const stop = () => {
        messages.push({
          messageType: 'user-left',
          payload: presenter,
        })

        data[presenter.id] = messages

        this.session.pub = pub

        this.playRecording(data)
      }

      let recording = false;
      actionRegistry.registerAction({
        path: ['Sessions'],
        name: 'Start Recording',
        callback: () => {
          if(!recording) {
            start();
            recording = true;
          }
        },
        availableInVR: true,
      })

      actionRegistry.registerAction({
        path: ['Sessions'],
        name: 'Stop Recording',
        callback: () => {
          stop()
          recording = false;
        },
        availableInVR: true,
      })
      actionRegistry.registerAction({
        path: ['Sessions'],
        name: 'Save',
        callback: () => {
          this.save(data)
        },
      })
    }
  }

  setResourceLoader(resourceLoader) {
    this.resourceLoader = resourceLoader

    const addRecording = file => {
      this.__recordings[file.name] = file
      const name = file.name.split('.')[0]
      this.actionRegistry.registerAction({
        path: ['Sessions', 'Recordings'],
        name,
        callback: () => {
          this.downloadAndPlayRecording(file.name)
        },
        availableInVR: true,
      })
    }

    this.resourceLoader.registerResourceCallback('.rec', file => {
      addRecording(file)
    })
    this.resourceLoader.registerResourceCallback('.zarchive', file => {
      addRecording(file)
    })
  }

  save(data) {
    saveAs(JSON.stringify(data), 'MyRecording.rec', 'application/json')
  }

  __stopPlayback() {
    for (let key in this.__timeoutIds) clearTimeout(this.__timeoutIds[key])
    this.__timeoutIds = {}
  }

  __play(id, stream, done) {
    let i = 0
    const next = () => {
      const message = stream[i]
      this.session._emit(message.messageType, message.payload, id)
      i++
      if (i < stream.length) {
        this.__timeoutIds[id] = setTimeout(next, message.ms)
      } else {
        done()
      }
    }
    this.__timeoutIds[id] = setTimeout(next, 1000)
  }

  playRecording(recording) {
    this.__stopPlayback()
    let count = 0
    this.__timeoutIds = {}
    for (let key in recording) {
      count++
      this.__play(key, recording[key], () => {
        count--
        if (count == 0) this.playRecording(recording)
      })
    }
  }
  
  downloadAndPlayRecording(name) {
    const file = this.__recordings[name]
    
    if (file.name.endsWith('.zarchive')) {
      this.resourceLoader.loadResource(file.id, entries => {
        let utf8decoder = new TextDecoder();
        const recording = JSON.parse(utf8decoder.decode(entries[Object.keys(entries)[0]]));
        this.playRecording(recording)
      })
    } else {
      fetch(new Request(file.url))
        .then(response => {
          if (response.ok) {
            response.json().then(recording => {
              this.playRecording(recording)
            })
          }
          else {
            throw new Error('404 Error: File not found.');
          }
        })
    }
  }
}
