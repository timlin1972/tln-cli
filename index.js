const CliEngine = require('./src/cli-engine');

const MODULE_NAME = 'cli';

const DEF_LOGGER = null;
const DEF_LEVEL = 'info';

const DEF_CONFIGS = {
  logger: DEF_LOGGER,
}

class Cli {
  constructor(configs=DEF_CONFIGS) {
    this.logger = configs.logger || DEF_LOGGER;

    this.cliEngine = new CliEngine({
      logger: this.logger,
    });

    this.log('info', 'Initialized');
  }

  run = command => this.cliEngine.run(command);

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

module.exports = Cli;
