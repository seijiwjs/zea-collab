<a name="SessionSync"></a>

### SessionSync
Helper class with default session sync behaviour


**See**: [Session](api/Session.md)  

* [SessionSync](#SessionSync)
    * [new SessionSync(session, appData, currentUser)](#new-SessionSync)
    * [syncStateMachines(stateMachine)](#syncStateMachines)
    * [directAttention(distance, duration)](#directAttention)

<a name="new_SessionSync_new"></a>

### new SessionSync
All default behaviours for session sub actions are defined here.You can use this as a guide or as the starter configuration for sub actions.


| Param | Type | Description |
| --- | --- | --- |
| session | <code>[Session](api/Session.md)</code> | The session value. |
| appData | <code>object</code> | The appData value. |
| currentUser | <code>object</code> | The currentUser value. |

<a name="SessionSync+syncStateMachines"></a>

### syncStateMachines
Starts synchronizing state changes between given state machines.



| Param | Type | Description |
| --- | --- | --- |
| stateMachine | <code>StateMachine</code> | The state machine for each connected client is registered here. |

<a name="SessionSync+directAttention"></a>

### directAttention
Instructs all session users to look and face a given target, while maybe approaching the target.



| Param | Type | Description |
| --- | --- | --- |
| distance | <code>Number</code> | The distance each member should adjust their positions relative to the target. |
| duration | <code>Number</code> | The time to establish focus. |

