# Setup 3D Collaboration


```javascript

const domElement = document.getElementById("viewport");

const scene = new Scene()
scene.setupGrid(10, 10)

const renderer = new GLRenderer(domElement)
renderer.setScene(scene)
renderer.resumeDrawing()

////////////////////////////////////
// Setup Collaboration

const appData = {
  scene,
  renderer
}


const socketUrl = 'https://websocket-staging.zea.live'

const color = Color.random();
const firstNames = ["Phil", "Froilan", "Alvaro", "Dan", "Mike", "Rob", "Steve"]
const lastNames = ["Taylor", "Smith", "Haines", "Moore", "Elías Pájaro Torreglosa", "Moreno"]
const userData = {
  given_name: firstNames[Math.randomInt(0, firstNames.length)],
  family_name: lastNames[Math.randomInt(0, lastNames.length)],
  id: Math.random().toString(36).slice(2, 12),
  color: color.toHex()
}

const session = new Session(userData, socketUrl);
const roomId = document.location.href
session.joinRoom(roomId);

const sessionSync = new SessionSync(session, appData, userData);

```



> See the live example

[Labels](./setup-3d-collaboration.html ':include :type=iframe width=100% height=800px')

<div class="download-section">
  <a class="download-btn" title="Download"
    onClick="downloadTutorial('setup-3d-collaboration.zip', ['/tutorials/setup-3d-collaboration.html'])" download>
    Download
  </a>
</div>
