<a name="Avatar"></a>

### Avatar
Represents the state on steroids of a user in the session.



* [Avatar](#Avatar)
    * [new Avatar(appData, userData, currentUserAvatar)](#new-Avatar)
    * [attachRTCStream(video)](#attachRTCStream)
    * [detachRTCStream()](#detachRTCStream)
    * [getCamera() ⇒ <code>Camera</code>](#getCamera)
    * [bindCamera()](#bindCamera)
    * [unbindCamera()](#unbindCamera)
    * [updatePose(data)](#updatePose)
    * [destroy()](#destroy)

<a name="new_Avatar_new"></a>

### new Avatar
Initializes all the components of the Avatar like, user image, labels, tranformations, color, etc.
<br>
Contains a TreeItem property to which all the children items can be attached to. i.e. Camera.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| appData | <code>object</code> |  | The appData value. Must contain the renderer |
| userData | <code>object</code> |  | The userData value. |
| currentUserAvatar | <code>boolean</code> | <code>false</code> | The currentUserAvatar value. |

<a name="Avatar+attachRTCStream"></a>

### attachRTCStream
Usually called on `USER_VIDEO_STARTED` Session action this attaches the video MediaStream to the avatar cam geometry item.



| Param | Type | Description |
| --- | --- | --- |
| video | <code>MediaStream</code> | The video param. |

<a name="Avatar+detachRTCStream"></a>

### detachRTCStream
As opposite of the `attachRTCStream` method, this is usually called on `USER_VIDEO_STOPPED` Session action, removing the RTC Stream from the treeItem


<a name="Avatar+getCamera"></a>

### getCamera
Returns Avatar's Camera tree item.


**Returns**: <code>Camera</code> - The return value.  
<a name="Avatar+bindCamera"></a>

### bindCamera
Traverses Camera's sibling items and hide them, but shows Camera item.


<a name="Avatar+unbindCamera"></a>

### unbindCamera
Traverses Camera's sibling items and show them, but hides Camera item.


<a name="Avatar+updatePose"></a>

### updatePose
Method that executes the representation methods for the specified `interfaceType` in the data object.
<br>
Valid `interfaceType` values: `CameraAndPointer`, `Vive` and `VR`



| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | The data param. |

<a name="Avatar+destroy"></a>

### destroy
Removes Avatar's TreeItem from the renderer.


