const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
  addWebpackModuleRule
} = require('customize-cra')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin()

const isDev = process.env.NODE_ENV === 'development'

const overrideEntry = (config) => {
  config.entry = {
    main: './src/popup', // the extension UI
    background: isDev ? './src/background/dev' : './src/background',
    content: './src/content',
    options: './src/options'
    // inject: './src/content/inject'
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
    // new BundleAnalyzerPlugin(),
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
  webpack: override(
    overrideEntry,
    overrideOutput,
    overridePlugins,
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    }),
    (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify'),
        url: require.resolve('url')
      }
      return config
    },
    addWebpackPlugin(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      })
    ),
    addWebpackModuleRule({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false
      }
    }),
    (config) => {
      config.resolve.plugins = config.resolve.plugins.filter(
        (plugin) => !(plugin.constructor.name === 'ModuleScopePlugin')
      )
      return config
    }
  )
}
