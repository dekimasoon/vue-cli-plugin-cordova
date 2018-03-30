export default function loadCordova(cb<%- hasTS ? ': () => void' : '' %>) {
  if (document.URL.indexOf('http') === 0) {
    appendCordovaScript();
  }
  document.addEventListener('deviceready', () => {
    cb();
  });
}

function appendCordovaScript() {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = getCordovaUrl();
  document.head.appendChild(script);
}

function getCordovaUrl() {
  // ?_cp=ios
  const params = window.location.search.substr(1).split('&');
  const platform = params.reduce((p, kv) => {
    const split = kv.split('=');
    return split[0] === '_cp' ? split[1] : p;
  }, '');
  return platform ? `cordova/${platform}/www/cordova.js` : 'cordova.js';
}
