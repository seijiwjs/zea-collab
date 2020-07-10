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
Session is used to store information about users and the communication method(Sockets).

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
        * [leaveRoom()](#leaveRoom)
        * [getUsers()](#getUsers)
        * [getUser(id) ⇒ <code>object</code> \| <code>undefined</code>](#getUser)
        * [pub(messageType, payload, ack)](#pub)
        * [sub(messageType, callback)](#sub)
    * _static_
        * [actions](#actions)

<a name="new_Session_new"></a>

### new Session
Instantiates a new session object that contains user's data and the socketUrl that is going to connect to.


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
| publish | <code>boolean</code> | <code>true</code> | Determines if the socket emits/publishes or not the `USER_VIDEO_STOPPED` event. **See:** [action |](#action)

<a name="Session+startCamera"></a>

### startCamera
Looks in the media stream tracks for an object that has the `kind` attribute to `video` and **enables** the first one in the list.

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| publish | <code>boolean</code> | <code>true</code> | Determines if the socket emits/publishes or not the `USER_VIDEO_STARTED` event. **See:** [action |](#action)

<a name="Session+muteAudio"></a>

### muteAudio
Looks in the media stream tracks for an object that has the `kind` attribute to `audio` and **disables** the first one in the list.

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| publish | <code>boolean</code> | <code>true</code> | Determines if the socket emits/publishes or not the `USER_AUDIO_STOPPED` event. **See:** [action |](#action)

<a name="Session+unmuteAudio"></a>

### unmuteAudio
Looks in the media stream tracks for an object that has the `kind` attribute to `audio` and **enables** the first one in the list.

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| publish | <code>boolean</code> | <code>true</code> | Determines if the socket emits/publishes or not the `USER_AUDIO_STARTED` event. **See:** [action |](#action)

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
Creates the [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) and adds it to the body.

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
Joins the user to a room and subscribes to all [private actions](#private_actions). 

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Description |
| --- | --- | --- |
| roomId | <code>string</code> \| <code>number</code> | Room ID value |

<a name="Session+leaveRoom"></a>

### leaveRoom
Disconnects the user from his current room, emitting/publishing the `LEFT_ROOM` event. **See:** [action](#action)

**Kind**: instance method of [<code>Session</code>](#Session)  
<a name="Session+getUsers"></a>

### getUsers
Returns userData for all the users in the session.

**Kind**: instance method of [<code>Session</code>](#Session)  
<a name="Session+getUser"></a>

### getUser
Returns the specific user information using the userId.

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> \| <code>number</code> | id specified in userData param. |

<a name="Session+pub"></a>

### pub
Emits/Publishes an event action to the socket.

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Description |
| --- | --- | --- |
| messageType | <code>string</code> | Represents the event action that is published |
| payload | <code>any</code> | It could be anything that you want to send to other users |
| ack | <code>function</code> | Function that will be called right after server response |

<a name="Session+sub"></a>

### sub
Registers a new handler for a given event.

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Description |
| --- | --- | --- |
| messageType | <code>string</code> | Represents the event action subscribed to. |
| callback | <code>function</code> | Recieves by parameters the payload sent by the publisher |

<a name="Session.actions"></a>

### action
Represents Custom Default Events used by `Session` class.

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
User specific room actions.

**Kind**: global enum  
**Properties**

| Name | Default |
| --- | --- |
| JOIN_ROOM | <code>join-room</code> | 
| PING_ROOM | <code>ping-room</code> | 
| LEAVE_ROOM | <code>leave-room</code> | 
