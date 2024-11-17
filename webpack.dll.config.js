const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'] // 这里列出你要打包的第三方库
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].dll.js',
    library: '[name]_dll'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: path.resolve(__dirname, 'dist', '[name]-manifest.json')
    })
  ]
}
