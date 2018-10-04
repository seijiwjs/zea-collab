import { VisualiveSession } from '@visualive/collab'

const PROJECT_ID = 'foo'
const FILE_ID = 'bar'
const USER_ID = 'abc123'

const visualiveSession = new VisualiveSession()

visualiveSession.join({
  userId: USER_ID,
  projectId: PROJECT_ID,
  fileId: FILE_ID,
})

visualiveSession.on(VisualiveSession.actions.USER_JOINED, sessionInfo => {
  console.info(sessionInfo)
})

visualiveSession.sendTextMessage('hello')
