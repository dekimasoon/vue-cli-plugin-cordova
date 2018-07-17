## Setup for all platforms

You need to [set up the cordova development environment](https://cordova.apache.org/docs/en/latest/guide/cli/index.html) beforehand.

```sh
$ vue create my-project   # create your vue project. install @vue/cli if you haven't.
$ cd my-project
$ vue add cordova         # add vue-cli-plugin-cordova and invoke it
$ npm run cordova-build   # make sure you can build your project 
$ cordova prepare         # prepare cordova resources
```

NOTE: On Windows, admin authority requires to run `vue add cordova` command. 
So that symlinks can be generated properly.

## Browser Platform

#### Start development
```sh
$ npm run cordova-serve
# open http://localhost:8080
```

#### Production Build
```sh
$ npm run cordova-build
$ cordova build browser
# The `platforms/browser/www` directory is ready to deployed.
``` 

## iOS Platform
- Your app runs on the WKWebview. This feature is provided by [cordova-plugin-ionic-webview](https://github.com/ionic-team/cordova-plugin-ionic-webview).

#### Start development
```sh
$ npm run cordova-serve

# in another tab
$ cordova run ios
```

#### Production Build
```sh
$ npm run cordova-build
$ cordova build ios
```

## Android Platform

#### Start development
```sh
$ npm run cordova-serve

# in another tab
$ cordova run android
```

#### Production Build
```sh
$ npm run cordova-build
$ cordova build android
```
