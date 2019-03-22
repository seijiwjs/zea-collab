var path = require('path')

module.exports = {
  externals: {
    'socket.io-client': 'socket.io-client',
    shortid: 'shortid',
  },
  mode: 'production',
  entry: './src/index.js',
  output: {
    globalObject: 'this',
    path: path.resolve(__dirname, 'dist'),
    filename: 'visualive-collab.js',
    library: 'visualiveCollab',
    libraryTarget: 'umd',
  },
  devtool: 'eval-source-map',
}
