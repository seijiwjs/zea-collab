import debug from 'debug'

const zeaDebug = debug('zea-collab')

// const zeaDebug = (globalThis.debug) ? debug('zea-collab') : function() {
//   const searchParams = new URLSearchParams(window.location.search)
//   const emit = searchParams.has("zea-collab")
//   return (msg) => {
//     if (emit) {
//       console.log(msg)
//     }
//   }
// }()

export default zeaDebug
