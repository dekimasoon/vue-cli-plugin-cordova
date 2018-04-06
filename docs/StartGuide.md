## Setup for all platforms

```sh
$ npm i @vue/cli -g
$ vue create my-project    
$ cd my-project 
$ npm i dekimasoon/vue-cli-plugin-cordova  # publish to npm soon
$ vue invoke vue-cli-plugin-cordova
```

And you need to [set up the cordova development environment](https://cordova.apache.org/docs/en/latest/guide/cli/index.html).

## Browser Platform

#### Start development
```sh
$ npm run cordova-serve

# in another tab
$ cordova prepare
$ open http://localhost:8080
```

#### Production Build
```sh
$ npm run corodva-build
$ cordova build browser
# The `platforms/browser/www` directory is ready to deployed.
``` 

## iOS / Android Platform

#### Start development
```sh
$ npm run cordova-serve

# in another tab
$ cordova platform add ios   # or android
$ cordova run ios            # or android
```

#### Production Build
```sh
$ npm run corodva-build
$ cordova build ios          # or android
```
