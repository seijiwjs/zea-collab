# Collision protected by default

Zea Collab, by default, ensures that every room is unique to each app, otherwise it'd be easy for users to collide by simply using the same room id across different apps. For example:

**From https://foo.com**

```javascript
session.joinRoom('my-room');
```

**From https://bar.com**

```javascript
session.joinRoom('my-room');
```

The previous example works as expected, because Zea Collab is smart enough to direct each user to the app they actually belong to, in that way they'll never mix.

## Disabling collision protection

Collision protection can be disable by passing the `isCollisionProtected: false` option when connecting to a room. Very often this is useful for localhost testing. For example:

**From http://localhost:8080**

```javascript
session.joinRoom('my-room', {
  isCollisionProtected: false
});
```

**From http://localhost:8081**

```javascript
session.joinRoom('my-room', {
  isCollisionProtected: false
});
```
