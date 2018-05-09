module.exports = (api, options, rootOptions) => {
  const fs = require('fs')

  api.extendPackage({
    scripts: {
      'cordova-serve': 'vue-cli-service cordova-serve',
      'cordova-build': 'vue-cli-service build --dest www'
    },
    dependencies: {
      'cordova-android': '^7.1.0',
      'cordova-browser': '^5.0.3',
      'cordova-ios': '^4.5.4',
      'cordova-plugin-device': '^2.0.1',
      'cordova-plugin-ionic-webview': '^1.2.0',
      'cordova-plugin-splashscreen': '^5.0.2',
      'cordova-plugin-statusbar': '^2.4.2',
      'cordova-plugin-whitelist': '^1.3.3',
      'material-design-icons': '^3.0.1',
      'typeface-roboto': '0.0.54',
      'vuetify': '^1.0.14'
    },
    cordova: {
      plugins: {
        'cordova-plugin-device': {},
        'cordova-plugin-ionic-webview': {},
        'cordova-plugin-splashscreen': {},
        'cordova-plugin-statusbar': {},
        'cordova-plugin-whitelist': {}
      },
      platforms: [
        'android',
        'browser',
        'ios'
      ]
    }
  })

  const hasTS = api.hasPlugin('typescript')
  const routerPath = api.resolve(`./src/router.${hasTS ? 'ts' : 'js'}`)
  const hasRouter = fs.existsSync(routerPath)
  api.render('./templates', { hasTS, hasRouter })

  api.postProcessFiles(files => {
    // index.html
    const indexHtml = files['public/index.html']
    if (indexHtml) {
      const lines = indexHtml.split(/\r?\n/g).reverse()
      const lastMetaIndex = lines.findIndex(line => line.match(/\s+<meta/))
      lines[lastMetaIndex] +=
        `\n    <!-- TODO: You should modify CSP for production build -->` +
        `\n    <meta http-equiv="Content-Security-Policy" content="default-src gap: data: 'unsafe-inline' 'unsafe-eval' *">`
      files['public/index.html'] = lines.reverse().join('\n')
    }
    // main.js
    const isTS = 'src/main.ts' in files
    const mainFile = `src/main.${isTS ? 'ts' : 'js'}`
    const main = files[mainFile]
    if (main) {
      const lines = main.split(/\r?\n/g).reverse()
      const topIndex = lines.length - 1
      lines[topIndex] =
        `import 'typeface-roboto';\n` +
        `import 'material-design-icons/iconfont/material-icons.css';\n` +
        `import 'vuetify/dist/vuetify.css';\n` +
        lines[topIndex]
      const lastImportIndex = lines.findIndex(line => line.match(/^import/))
      lines[lastImportIndex] +=
        `\nimport cordovaLoader from './cordovaLoader';` +
        `\nimport vuetify from 'vuetify';`
      const startAt = lines[0] === '' ? 1 : 0
      const declareVueIndex = lines.findIndex(line => line.match(/new Vue/))
      for (let i = startAt; i <= declareVueIndex; i++) {
        if (i === startAt) {
          lines[i] = `  ${lines[i]}\n});`
        } else if (i === declareVueIndex) {
          lines[i] = `Vue.use(vuetify);\n\ncordovaLoader(() => {\n  ${lines[i]}`
        } else {
          lines[i] = `  ${lines[i]}`
        }
      }
      files[mainFile] = lines.reverse().join('\n')
    }
    // cordovaLoarder.js
    if (isTS) {
      const loader = 'src/cordovaLoader'
      const content = files[`${loader}.js`]
      files[`${loader}.ts`] = content
      delete files[`${loader}.js`]
    }
  })

  api.onCreateComplete(() => {
    const path = require('path')

    // .gitignore - not included in files on postProcessFiles
    const ignorePath = api.resolve('.gitignore')
    const ignore = fs.existsSync(ignorePath)
      ? fs.readFileSync(ignorePath, 'utf-8')
      : ''
    fs.writeFileSync(ignorePath, ignore + '\n# Cordova\n/www\n/platforms\n/plugins\n')

    // symlink to platforms
    const from = path.relative(process.cwd(), api.resolve('./public/cordova'))
    const to = api.resolve('./platforms')
    fs.symlinkSync(to, from, 'dir')
  })
}

