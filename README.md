# vue-cli-plugin-cordova
[Vue CLI 3.x](https://github.com/vuejs/vue-cli) plugin for Apache Cordova.  

**Features**

Easely and simply integrate Corodva into your Vue app with:
- Hot reloading on iOS/Android simulators and real devices.
- Follow industry best practices as much as possible.

## Status: beta
Under development. Check out TODO what is not implemented yet.

## Quickstart
Please see [start guide](https://github.com/dekimasoon/vue-cli-plugin-cordova/blob/master/docs/StartGuide.md).

```sh
$ vue add cordova
$ npm run cordova-build
$ cordova prepare
$ npm run cordova-serve

# in another tab
$ cordova prepare
$ open http://localhost:8080
```

## If hot reloading not working
Make sure that your development PC and the test devices are connected to the same LAN, and also there is no firewall blocking access from the test devices to the PC.

## TODO
- Set the Wkwebview default for iOS
- Provide CSS for iPhoneX layout problems
- Make sure unit and e2e tests working
- Better security settings or guiding
- spec?

## License
MIT
