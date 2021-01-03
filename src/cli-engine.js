const CliScripts = require('./cli-scripts');

const MODULE_NAME = 'cli-engine';

const DEF_LOGGER = null;
const DEF_LEVEL = 'info';
const DEF_I18N = null;

const DEF_CONFIGS = {
  logger: DEF_LOGGER,
  i18n: DEF_I18N,
}

const cliScripts = {
  'load logger': command => CliScripts.loadLogger(command),
  'load i18n': command => CliScripts.loadI18n(command),
  'show i18n': command => CliScripts.showI18n(command),
  'start i18n': command => CliScripts.startI18n(command),
  'load libToken': command => CliScripts.loadLibToken(command),
  'load graphqlMgr': command => CliScripts.loadGraphqlMgr(command),
  'load iam': command => CliScripts.loadIam(command),
  'load webServer': command => CliScripts.loadWebServer(command),
  'start webServer': command => CliScripts.startWebServer(command),
  'show webServer': command => CliScripts.showWebServer(command),
  'load graphqlServer': command => CliScripts.loadGraphqlServer(command),
  'start graphqlServer': command => CliScripts.startGraphqlServer(command),
  'set graphqlServer httpServer': command => CliScripts.setGraphqlServerHttpServer(command),
  'set graphqlServer httpsServer': command => CliScripts.setGraphqlServerHttpsServer(command),
  'load wol': command => CliScripts.loadWol(command),
  'wol show': command => CliScripts.wolShow(command),
  'wol sendWol': (command, data) => CliScripts.wolSendWol(command, data),
}

class CliEngine {
  constructor(configs=DEF_CONFIGS) {
    this.logger = configs.logger || DEF_LOGGER;
    this.i18n = configs.i18n || DEF_I18N;

    this.log('info', 'Initialized');
  }

  run = (command, data=null) => {
    return new Promise((resolve, reject) => {
      const msgRunI18n = this.i18n ? this.i18n.t('Run') : 'Run';
      this.log('debug', `${msgRunI18n}: ${command}`, true);
      if (command === 'stop') {
        return resolve(null);
      }

      if (command in cliScripts) {
        cliScripts[command](command, data)
          .then(ret => resolve(ret))
          .catch(err => reject(err));
      }
      else {
        return reject(Error(`Invalid command: ${command}`));
      }
    });
  }

  getI18n = () => CliScripts.getI18n();
  setI18n = i18n => this.i18n = i18n;

  getLogger = () => CliScripts.getLogger();
  setLogger = logger => this.logger = logger;

  log = (level=DEF_LEVEL, msg, noI18n=false) => {
    const msgI18n = noI18n ? msg : this.i18n ? this.i18n.t(msg) : msg;
    this.logger ? 
      this.logger.log(MODULE_NAME, level, msgI18n) :
      console.log(`${level}: [${MODULE_NAME}] ${msgI18n}`);
  }

  toString = () => {
    return `[${MODULE_NAME}]\n \
      \tlogger: ${this.logger ? 'yes' : 'no'}\n \
      `;
  }
}

module.exports = CliEngine;
