# Zea Collab

[![NPM Package][npm]][npm-url]
[![Build Size][build-size]][build-size-url]
[![NPM Downloads][npm-downloads]][npmtrends-url]

The Zea Collab library provides Client and Server side tools for connecting and synchronizing users.

## Adding Zea Collab to your project

Insert these tags in your page:

For staging environment:

```html
<script src="https://websocket-staging.zea.live/socket.io/socket.io.js"></script>
<script crossorigin src="https://unpkg.com/@zeainc/zea-collab"></script>
```

For production environment:

```html
<script src="https://websocket.zea.live/socket.io/socket.io.js"></script>
<script crossorigin src="https://unpkg.com/@zeainc/zea-collab"></script>
```

## Enabling useful debug messages

1. Open the DevTools console.
2. Input this command: `localStorage.debug = 'zea:collab'`
3. Reload your browser.


## Building and dist

```bash
yarn run dist
```

[npm]: https://badge.fury.io/js/%40zeainc%2Fzea-collab.svg
[npm-url]: https://www.npmjs.com/package/@zeainc/zea-collab
[build-size]: https://badgen.net/bundlephobia/minzip/@zeainc/zea-collab
[build-size-url]: https://bundlephobia.com/result?p=@zeainc/zea-collab
[npm-downloads]: https://img.shields.io/npm/dw/@zeainc/zea-collab
[npmtrends-url]: https://www.npmtrends.com/@zeainc/zea-collab
