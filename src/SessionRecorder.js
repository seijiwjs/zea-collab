
// Function to download data to a file
function saveAs(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function genID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default class SessionRecorder {

  constructor(visualiveSession, actionRegistry) {
    this.visualiveSession = visualiveSession;
    this.actionRegistry = actionRegistry;

    const pictures = [
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    ]

    const data = {}
    let presenter;
    let pub;
    let messages;
    const start = () => {

      const picIndex = getRandomInt(pictures.length)
      presenter = {
        id: genID(),
        picture: pictures[picIndex],
        name: 'Presenter'+Object.keys(data).length
      }

      messages = [];
      let msg = {
        messageType: 'user-joined',
        payload: presenter
      }
      let prev_t = performance.now();
      pub = this.visualiveSession.pub;
      this.visualiveSession.pub = (messageType, payload) => {
        // Record the time since the previous 
        // message and save it to the previous message.
        const t = performance.now();
        msg.ms = (t - prev_t);
        messages.push(msg);
        msg = {
          messageType,
          payload
        }
        prev_t = t;
        pub.call(this.visualiveSession, messageType, payload);
      }
    }

    const stop = () => {

      messages.push({
        messageType: 'user-left',
        payload: presenter
      });

      data[presenter.id] = messages;

      this.visualiveSession.pub = pub;

      this.__replayAll(data);
    }

    actionRegistry.registerAction({
      path: ['Sessions'],
      name: 'Start Recording',
      callback: () => {
        start();
      },
      availableInVR: true
    });

    actionRegistry.registerAction({
      path: ['Sessions'],
      name: 'Stop Recording',
      callback: () => {
        stop();
      },
      availableInVR: true
    });
    actionRegistry.registerAction({
      path: ['Sessions'],
      name: 'Save',
      callback: () => {
        this.save(data);
      },
    });
  }

  setResources(resources) {

    const addRecording = (key, resource)=>{
      appData.actionRegistry.registerAction({
        path: ['Sessions', 'Recordings'],
        name: key,
        callback: () => {
          this.play(key);
        },
        availableInVR: true
      });
    }

    this.__recordings = {};
    for (let key in resources) {
      const resource = resourcesDict[key];
      if (resource.name.endsWith('.rec')) 
        this.__recordings[key] = resource
    }
  }

  save(data) {
    saveAs(JSON.stringify(data), 'MyRec.rec', 'application/json');
  }

  __stopPlayback(){
    for(let key in this.__timeoutIds)
      clearTimeout(this.__timeoutIds[key])
    this.__timeoutIds = {};
  }

  __replay(id, stream, done) {
      let i = 0;
      const next = () => {
        const message = stream[i];
        this.visualiveSession._emit(message.messageType, message.payload, id);
        i++;
        if (i < stream.length) {
          this.__timeoutIds[id] = setTimeout(next, message.ms);
        }
        else {
          done();
        }
      }
      this.__timeoutIds[id] = setTimeout(next, 1000);
  }
  __replayAll(recording) {
    this.__stopPlayback();
    let count = 0;
    this.__timeoutIds = {};
    for(let key in recording) {
      count++;
      this.__replay(key, recording[key], ()=> {
        count--;
        if(count==0)
          this.__replayAll(recording);
      } )
    }
  }

  play(name) {
    const resource = this.__recordings[key];
    fetch(resource.url)
      .then(function(response) {
        return response.json();
      })
      .then(function(recording) {
        this.__replayAll();
      });
  }
}