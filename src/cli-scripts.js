const path = require('path');

let logger = null;
let i18n = null;
let libToken = null;
let graphqlMgr = null;
let iam = null;
let webServer = null;
let graphqlServer = null;

const loadLogger = _ => {
  return new Promise((resolve) => {
    const Logger = require('../../tln-logger');
    logger = new Logger();
    resolve(null);
  });
}

const getLogger = () => logger;

const loadI18n = _ => {
  return new Promise((resolve) => {
    const I18n = require('../../tln-i18n');
    const resources = require('../../lib/resource');

    i18n = new I18n({
      logger,
      resources,
      lng: 'zh',
      // debug: true,
    });

    resolve(null);
  });
}

const showI18n = _ => {
  return new Promise((resolve) => {
    console.log(i18n.toString());
    resolve(null);
  });
}

const startI18n = _ => i18n.start();

const getI18n = () => i18n;

const loadLibToken = _ => {
  return new Promise((resolve) => {
    const LibToken = require('../../tln-lib-token');
    libToken = new LibToken({ logger, i18n });

    resolve(null);
  });
}

const loadGraphqlMgr = _ => {
  return new Promise((resolve) => {
    const GraphqlMgr = require('../../tln-graphql-mgr');
    graphqlMgr = new GraphqlMgr({ logger, i18n });

    resolve(null);
  });
}

const loadIam = _ => {
  return new Promise((resolve) => {
    const Iam = require('../../tln-iam');
    iam = new Iam({ logger, libToken, i18n });
    graphqlMgr.addSchema(iam.getSchema());

    resolve(null);
  });
}

const loadWebServer = _ => {
  return new Promise((resolve) => {
    const WebServer = require('../../tln-web-server');

    webServer = new WebServer({ 
      logger, 
      i18n, 
      publicDir: path.join(__dirname, '..', '..', '..', 'public') });

    resolve(null);
  });
}

const startWebServer = _ => webServer.start();

const showWebServer = _ => {
  return new Promise((resolve) => {
    console.log(webServer.toString());
    resolve(null);
  });
}

const loadGraphqlServer = _ => {
  return new Promise((resolve) => {
    const GraphqlServer = require('../../tln-graphql-server');

    graphqlServer = new GraphqlServer({
      logger,
      app: webServer.getApp(),
      graphqlMgr,
      i18n,
    }); 

    resolve(null);
  });
}

const startGraphqlServer = _ => graphqlServer.start();

module.exports = {
  loadLogger,
  getLogger,
  loadI18n,
  startI18n,
  getI18n,
  showI18n,
  loadLibToken,
  loadGraphqlMgr,
  loadIam,
  loadWebServer,
  startWebServer,
  showWebServer,
  loadGraphqlServer,
  startGraphqlServer,
}