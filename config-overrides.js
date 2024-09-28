const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// get current environment and check it is dev or prod
const isDev = process.env.NODE_ENV === 'development'

const overrideEntry = (config) => {
  config.entry = {
    main: './src/popup', // the extension UI
    background: isDev ? './src/background/dev' : './src/background',
    content: './src/content',
    options: './src/options'
  }
  return config
}

const overrideOutput = (config) => {
  config.output = {
    ...config.output,
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].js'
  }
  return config
}

const overridePlugins = (config) => {
  // 移除默认的 HtmlWebpackPlugin
  config.plugins = config.plugins.filter(
    (plugin) => !(plugin instanceof HtmlWebpackPlugin)
  )

  // 添加新的 HtmlWebpackPlugin 实例
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['main', 'background', 'content']
    }),
    new HtmlWebpackPlugin({
      template: 'public/options.html',
      filename: 'options.html',
      chunks: ['options']
    })
  )

  return config
}

module.exports = {
  webpack: (config) =>
    override(
      overrideEntry,
      overrideOutput,
      overridePlugins,
      addWebpackAlias({
        '@': path.resolve(__dirname, 'src')
      }),
      addWebpackPlugin(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
      )
    )(config)
}
