const {
  info
} = require('@vue/cli-shared-utils')

const defaults = {
  mode: 'development',
  host: '0.0.0.0',
  port: 8080,
  https: false
}

module.exports = (api, options) => {
  const address = require('address')
  const portfinder = require('portfinder')

  api.registerCommand('cordova-serve', {
    description: 'start development server for cordova',
    usage: 'vue-cli-service cordova-serve [options]',
    options: {
      '--open': `open browser on server start`,
      '--host': `specify host (default: ${defaults.host})`,
      '--port': `specify port (default: ${defaults.port})`,
      '--https': `use https (default: ${defaults.https})`
    }
  }, args => {
    const projectDevServerOptions = options.devServer || {}
    portfinder.basePort = args.port || process.env.PORT || projectDevServerOptions.port || defaults.port
    return portfinder.getPortPromise().then(port => {
      const serveArgs = {
        open: args.open,
        host: args.host || process.env.HOST || projectDevServerOptions.host || defaults.host,
        port,
        https: args.https || projectDevServerOptions.https || defaults.https,
        lanIp: address.ip()
      }
      const wwwDirPath = api.resolve('www')
      info('your www/index.html is overwrited.')
      copyRedirectHtml(serveArgs, wwwDirPath)
      return api.service.run('serve', serveArgs)
    })
  })

  api.chainWebpack(webpackConfig => {
    if (process.env.NODE_ENV === 'production') {
      webpackConfig.plugin('copy')
        .tap(args => {
          args[0][0].ignore.push('cordova')
          args[0][0].ignore.push('config.xml')
          return args
        })
      webpackConfig.plugin('cordova')
        .use(require('html-webpack-include-assets-plugin'), [{
          assets: 'cordova.js',
          append: false,
          publicPath: false
        }])
    }
  })

  api.configureWebpack(config => {
    if (process.env.NODE_ENV === 'production') {
      // Default publicPath is '/'
      // And it's not working well with the 'file://' protocol
      config.output.publicPath = ''
    }
  })
}

function copyRedirectHtml (args, distDirPath) {
  const fs = require('fs')
  const path = require('path')
  const ejs = require('ejs')
  const templatePath = path.resolve(__dirname, './redirect.ejs')
  const templateStr = fs.readFileSync(templatePath, 'utf-8')
  const htmlStr = ejs.render(templateStr, args)
  if (!fs.existsSync(distDirPath)) {
    fs.mkdirSync(distDirPath)
  }
  const distPath = path.resolve(distDirPath, 'index.html')
  fs.writeFileSync(distPath, htmlStr)
}

module.exports.defaultModes = {
  'cordova-serve': 'development'
}
