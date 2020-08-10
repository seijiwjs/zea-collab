<a name="SessionRecorder"></a>

### SessionRecorder
Utility class that lets you record/play/download all the `pub` actions triggered on user's session.



* [SessionRecorder](#SessionRecorder)
    * [new SessionRecorder(session)](#new-SessionRecorder)
    * [startRecording()](#startRecording)
    * [stopRecording()](#stopRecording)
    * [downloadAndPlayRecording(url)](#downloadAndPlayRecording)

<a name="new_SessionRecorder_new"></a>

### new SessionRecorder
Initializes the state of the SessionRecorder object declaring the start and stop recording methods.


| Param | Type | Description |
| --- | --- | --- |
| session | <code>Session</code> | An instance of the Session class. |

<a name="SessionRecorder+startRecording"></a>

### startRecording
Starts recording all the `pub` action methods triggered in user's session.


<a name="SessionRecorder+stopRecording"></a>

### stopRecording
Stops the recording of all `pub` actions and starts playing the recording.


<a name="SessionRecorder+downloadAndPlayRecording"></a>

### downloadAndPlayRecording
Downloads the recorded data from an external url and starts playing it.



| Param | Type |
| --- | --- |
| url | <code>string</code> | 

