## Classes

<dl>
<dt><a href="#Session">Session</a></dt>
<dd><p>Session is used to store information about users and the communication method(Sockets).
<br>
Also has the actions to stream media.</p>
</dd>
</dl>

<a name="Session"></a>

## Session
Session is used to store information about users and the communication method(Sockets).<br>Also has the actions to stream media.

**Kind**: global class  

* [Session](#Session)
    * [new Session(userData, socketUrl)](#new-Session)
    * _instance_
        * [stopCamera(publish)](#stopCamera)
        * [startCamera(publish)](#startCamera)
        * [muteAudio(publish)](#muteAudio)
        * [unmuteAudio(publish)](#unmuteAudio)
        * [getVideoStream(userId) ⇒ <code>MediaStream</code> \| <code>undefined</code>](#getVideoStream)
        * [setVideoStream(remoteStream, userId)](#setVideoStream)
        * [isJoiningTheSameRoom(roomId)](#isJoiningTheSameRoom)
        * [joinRoom(roomId)](#joinRoom)
    * _static_
        * [.actions](#Session.actions)

<a name="new_Session_new"></a>

### new Session
Instantiates a new session object that contains user's data and the socketUrl that is going to connect to.<br>In the userData object you can pass any information you want, but you must provide an `id`. In case you would like to use the [`zea-user-chip`](https://github.com/ZeaInc/zea-web-components/tree/staging/src/components/zea-user-chip) component, some specific data will be required, although they are not mandatory, it would be nice to have:* **firstName** or **given_name*** **lastName** or **family_name*** **avatar** or **picture** - The URL to the image* **color** - The RGBA hexadecimal string. i.e. #FFFFFF. (Random color in case you don't specify it)


| Param | Type | Description |
| --- | --- | --- |
| userData | <code>object</code> | Specifies user's information |
| socketUrl | <code>string</code> | Socket server you're connecting to. |

<a name="Session+stopCamera"></a>

### stopCamera
Looks in the media stream tracks for an object that has the `kind` attribute to `video` and **disables** the first one in the list.

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| publish | <code>boolean</code> | <code>true</code> | Determines if the socket emits/publishes or not the `USER_VIDEO_STOPPED` event. **See:** [action](#action) |

<a name="Session+startCamera"></a>

### startCamera
Looks in the media stream tracks for an object that has the `kind` attribute to `video` and **enables** the first one in the list.

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| publish | <code>boolean</code> | <code>true</code> | Determines if the socket emits/publishes or not the `USER_VIDEO_STARTED` event. **See:** [action](#action) |

<a name="Session+muteAudio"></a>

### muteAudio
Looks in the media stream tracks for an object that has the `kind` attribute to `audio` and **disables** the first one in the list.

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| publish | <code>boolean</code> | <code>true</code> | Determines if the socket emits/publishes or not the `USER_AUDIO_STOPPED` event. **See:** [action](#action) |

<a name="Session+unmuteAudio"></a>

### unmuteAudio
Looks in the media stream tracks for an object that has the `kind` attribute to `audio` and **enables** the first one in the list.

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| publish | <code>boolean</code> | <code>true</code> | Determines if the socket emits/publishes or not the `USER_AUDIO_STARTED` event. **See:** [action](#action) |

<a name="Session+getVideoStream"></a>

### getVideoStream
Returns the [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) of requested user(If exists).

**Kind**: instance method of [<code>Session</code>](#Session)  
**Returns**: <code>MediaStream</code> \| <code>undefined</code> - - User's video stream  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> \| <code>number</code> | User id specified in userData |

<a name="Session+setVideoStream"></a>

### setVideoStream
Creates the [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) and adds it to the body.The video will start playing as soon as the duration and dimensions of the media have been determined<br>In case the user already has a stream nothing would happend.

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type |
| --- | --- |
| remoteStream | <code>MediaStream</code> \| <code>MediaSource</code> \| <code>Blob</code> \| <code>File</code> | 
| userId | <code>string</code> \| <code>number</code> | 

<a name="Session+isJoiningTheSameRoom"></a>

### isJoiningTheSameRoom
Checks if this Session's roomId is the same as the passed in the parameters.

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type |
| --- | --- |
| roomId | <code>boolean</code> | 

<a name="Session+joinRoom"></a>

### joinRoom
Joins the user to a room, and subscribes it to all private actions

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Description |
| --- | --- | --- |
| roomId | <code>string</code> \| <code>number</code> | Room ID value |

<a name="Session.actions"></a>

### action
**Kind**: static enum of [<code>Session</code>](#Session)  
**Properties**

| Name | Default |
| --- | --- |
| USER_JOINED | <code>user-joined</code> | 
| USER_VIDEO_STARTED | <code>user-video-started</code> | 
| USER_VIDEO_STOPPED | <code>user-video-stopped</code> | 
| USER_AUDIO_STARTED | <code>user-audio-started</code> | 
| USER_AUDIO_STOPPED | <code>user-audio-stopped</code> | 
| USER_LEFT | <code>user-left</code> | 
| LEFT_ROOM | <code>left-room</code> | 
| TEXT_MESSAGE | <code>text-message</code> | 
| POSE_CHANGED | <code>pose-message</code> | 
| COMMAND_ADDED | <code>command-added</code> | 
| COMMAND_UPDATED | <code>command-updated</code> | 
| FILE_WITH_PROGRESS | <code>file-with-progress</code> | 

<a name="private_actions"></a>

## private\_actions
**Kind**: global enum  
**Properties**

| Name | Default |
| --- | --- |
| JOIN_ROOM | <code>join-room</code> | 
| PING_ROOM | <code>ping-room</code> | 
| LEAVE_ROOM | <code>leave-room</code> | 

