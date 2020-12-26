const Logger = require('../../tln-logger');
let logger = null;

const WebServer = require('../../tln-web-server');
let webServer = null;

const loadLogger = _ => {
  return new Promise((resolve) => {
    logger = new Logger();

    resolve(null);
  });
}
const loadWebServer = () => {
  return new Promise((resolve) => {
    webServer = new WebServer({
      logger,
    });

    resolve(null);
  });
}

const startWebServer = () => {
  return webServer.start();
}

module.exports = {
  loadLogger,
  loadWebServer,
  startWebServer,
}