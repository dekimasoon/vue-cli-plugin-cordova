# vue-cli-plugin-cordova
[![NPM Version](https://img.shields.io/npm/v/vue-cli-plugin-cordova.svg)](https://www.npmjs.com/package/vue-cli-plugin-cordova)

[Vue CLI 3.x](https://github.com/vuejs/vue-cli) plugin for Apache Cordova.  

**Features**

Easely and simply integrate Corodva into your Vue app with:
- Hot reloading on iOS/Android simulators and real devices.
- Follow industry best practices as much as possible.

## Quickstart
You need to [set up the cordova development environment](https://cordova.apache.org/docs/en/latest/guide/cli/index.html) beforehand.

```sh
$ vue add cordova        # On Windows, you need to run this commands as administrator.
$ npm run cordova-build
$ cordova prepare
$ npm run cordova-serve

# in another tab
$ cordova run android
```

Please see [start guide](https://github.com/dekimasoon/vue-cli-plugin-cordova/blob/master/docs/StartGuide.md) for more details.

## If hot reloading not working
Make sure that your development PC and the test devices are connected to the same LAN, and also there is no firewall blocking access from the test devices to the PC.

## TODO
- Make sure unit and e2e tests working
- Better security settings or guiding
- add spec

## License
MIT
