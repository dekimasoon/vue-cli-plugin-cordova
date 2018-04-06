module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    scripts: {
      'cordova-serve': 'vue-cli-service cordova-serve',
      'cordova-build': 'vue-cli-service build --dest www'
    },
    dependencies: {
      'cordova-browser': '^5.0.3',
      'cordova-plugin-whitelist': '^1.3.3',
      'cordova-plugin-device': '^2.0.1'
    },
    cordova: {
      plugins: {
        'cordova-plugin-whitelist': {},
        'cordova-plugin-device': {}
      },
      platforms: [
        'browser'
      ]
    }
  })

  api.render('./templates', {
    hasTS: api.hasPlugin('typescript')
  })

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
      const lastImportIndex = lines.findIndex(line => line.match(/^import/))
      lines[lastImportIndex] += `\nimport cordovaLoader from './cordovaLoader';`
      const startAt = lines[0] === '' ? 1 : 0
      const declareVueIndex = lines.findIndex(line => line.match(/new Vue/))
      for (let i = startAt; i <= declareVueIndex; i++) {
        if (i === startAt) {
          lines[i] = `  ${lines[i]}\n});`
        } else if (i === declareVueIndex) {
          lines[i] = `cordovaLoader(() => {\n  ${lines[i]}`
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
    const fs = require('fs')
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

