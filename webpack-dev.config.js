var path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'visualive-collab.js',
    library: 'visualiveCollab',
    libraryTarget: 'umd',
  },
  devtool: 'eval-source-map',
}
