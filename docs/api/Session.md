## Classes

<dl>
<dt><a href="#Session">Session</a></dt>
<dd><p>Session is used to store information about users and the communication method(Sockets).
<br>
Also has the actions to stream media.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#private_actions">private_actions</a></dt>
<dd><p>User specific room actions.</p>
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
        * [leaveRoom()](#leaveRoom)
        * [getUsers()](#getUsers)
        * [getUser(id) ⇒ <code>object</code> \| <code>undefined</code>](#getUser)
        * [pub(messageType, payload, ack)](#pub)
        * [sub(messageType, callback)](#sub)
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
Joins the user to a room and subscribes to all [private actions](#private_actions). Also subscribes the user to a wildcard event that can recieve any custom action(Excluding private actions). This is very useful when you wanna emit/publish custom events that are not in the pre-stablished custom [actions](#actions).<br>Emits/publishes the `JOIN_ROOM` event. **See:** [action](#action)

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Description |
| --- | --- | --- |
| roomId | <code>string</code> \| <code>number</code> | Room ID value |

<a name="Session+leaveRoom"></a>

### leaveRoom
Disconnects the user from his current room, emitting/publishing the `LEFT_ROOM` event. **See:** [action](#action)<br>If the socket exists then `USER_LEFT` will be also emitted, check [joinRoom](#joinRoom) method.

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
Registers a new handler for a given event.**Note:** The session can handle multiple callbacks for a single event.

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Description |
| --- | --- | --- |
| messageType | <code>string</code> | Represents the event action subscribed to. |
| callback | <code>function</code> | Recieves by parameters the payload sent by the publisher |

<a name="Session.actions"></a>

### action
Represents Custom Default Events used by `Session` class.

**Kind**: static property of [<code>Session</code>](#Session)  
<a name="private_actions"></a>

## private\_actions
User specific room actions.

**Kind**: global constant  
