const CliScripts = require('./cli-scripts');

const MODULE_NAME = 'cli-engine';

const DEF_LOGGER = null;
const DEF_LEVEL = 'info';

const DEF_CONFIGS = {
  logger: DEF_LOGGER,
}

const cliScripts = {
  'load logger': command => CliScripts.loadLogger(command),
  'load webServer': command => CliScripts.loadWebServer(command),
  'start webServer': command => CliScripts.startWebServer(command),
}

class CliEngine {
  constructor(configs=DEF_CONFIGS) {
    this.logger = configs.logger || DEF_LOGGER;

    this.log('info', 'Initialized');
  }

  run = command => {
    return new Promise((resolve, reject) => {
      this.log('info', `Run: ${command}`);
      if (command === 'stop') {
        return resolve(null);
      }

      if (command in cliScripts) {
        cliScripts[command](command)
          .then(ret => resolve(ret))
          .catch(err => reject(err));
      }
      else {
        return reject(Error(`Invalid command: ${command}`));
      }
    });
  }

  log = (level=DEF_LEVEL, msg) => {
    if (this.logger !== null) {
      this.logger.log(MODULE_NAME, level, msg)
    }
    else {
      console.log(`${level}: [${MODULE_NAME}] ${msg}`);
    }
  }

  toString = () => {
    return `[${MODULE_NAME}]\n \
      \tlogger: ${this.logger ? 'yes' : 'no'}\n \
      `;
  }
}

module.exports = CliEngine;
