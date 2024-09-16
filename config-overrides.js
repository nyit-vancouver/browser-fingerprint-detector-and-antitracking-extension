const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

const overrideEntry = (config) => {
  config.entry = {
    main: './src/popup', // the extension UI
    background: './src/background',
    content: './src/content'
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

module.exports = {
  webpack: (config) =>
    override(
      overrideEntry,
      overrideOutput,
      addWebpackAlias({
        '@': path.resolve(__dirname, 'src')
      })
    )(config)
}
