
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

export default class SessionRecorder {

  constructor(visualiveSession, actionRegistry) {
    this.visualiveSession = visualiveSession;
    this.actionRegistry = actionRegistry;

    this.__presenter = {
      id: 12345,
      name: 'Presenter',
      picture:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    }


    let pub;
    const start = () => {
      this.__messages = [];
      let msg = {
        messageType: 'user-joined',
        payload: this.__presenter
      }
      let prev_t = performance.now();
      pub = this.visualiveSession.pub;//.bind(this.visualiveSession);
      this.visualiveSession.pub = (messageType, payload) => {
        const t = performance.now();
        msg.ms = (t - prev_t);
        this.__messages.push(msg);
        msg = {
          messageType,
          payload
        }
        prev_t = t;
        pub.call(this.visualiveSession, messageType, payload);
      }
    }

    const stop = () => {
      this.visualiveSession.pub = pub;

      this.__messages.push({
        messageType: 'user-left',
        payload: this.__presenter
      });
      this.__replay();

    }

    actionRegistry.registerAction({
      path: ['Sessions'],
      name: 'Start Recording',
      callback: () => {
        start();
      },
    });

    actionRegistry.registerAction({
      path: ['Sessions'],
      name: 'Stop Recording',
      callback: () => {
        stop();
      },
    });
    actionRegistry.registerAction({
      path: ['Sessions'],
      name: 'Save',
      callback: () => {
        saveAs(JSON.stringify(this.__messages, null, 2), 'MyRec.rec', 'application/json');
      },
    });
  }

  setPresenterDetails(presenter) {
    this.__presenter = presenter;
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

  save() {
    saveAs(JSON.stringify(this.__messages, null, 2), 'MyRec.rec', 'application/json');
  }

  __replay() {
      let i = 0;
      const next = () => {
        const message = this.__messages[i];
        this.visualiveSession._emit(message.messageType, message.payload, this.__presenter.id);
        i++;
        if (i < this.__messages.length) {
          setTimeout(next, message.ms);
        }
        else {
          i = 0;
          setTimeout(next, 1000);
        }
      }
      setTimeout(next, 1000);
  }

  play(name) {
    const resource = this.__recordings[key];
    fetch(resource.url)
      .then(function(response) {
        return response.json();
      })
      .then(function(recording) {
        let i = 0;
        const next = () => {
          const message = recording[i];
          this.visualiveSession._emit(message.messageType, message.payload, this.__presenter.id);
          if (i < this.__messages.length) {
            setTimeout(next, message.ms);
            i++;
          }
        }
        next();
      });
  }
}