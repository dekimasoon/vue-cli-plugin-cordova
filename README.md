# vue-cli-plugin-cordova
[Vue CLI 3.x](https://github.com/vuejs/vue-cli) plugin for Apache Cordova.  

**Features**

Easely and simply integrate Corodva into your Vue app with:
- Hot reloading on iOS/Android simulators and real devices.
- Follow industry best practices as much as possible.

## Status: beta
Under development. Check out TODO what is not implemented yet.

## Quickstart
You need to [set up the cordova development environment](https://cordova.apache.org/docs/en/latest/guide/cli/index.html) beforehand.

```sh
$ vue create your-project
$ npm i dekimasoon/vue-cli-plugin-cordova  # publish to npm soon
$ vue invoke vue-cli-plugin-cordova
$ npm run cordova-serve     # or 'cordova-build' for production build
$ cordova platform add ios  # or android
$ cordova run ios           # enjoy hot reloading
```

## If hot reloading now working
Make sure that your development PC and the test devices are connected to the same LAN, and also there is no firewall blocking access from the test devices to the PC.

## TODO
- Support `browser` platform
- Set the Wkwebview default for iOS
- Provide CSS for iPhoneX layout problems
- Make sure unit and e2e tests working
- Better security settings or guiding
- spec?

## License
MIT
