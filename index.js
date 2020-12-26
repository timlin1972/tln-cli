const CliEngine = require('./src/cli-engine');

const MODULE_NAME = 'cli';

const DEF_LOGGER = null;
const DEF_LEVEL = 'info';
const DEF_I18N = null;

const DEF_CONFIGS = {
  logger: DEF_LOGGER,
  i18n: DEF_I18N,
}

class Cli {
  constructor(configs=DEF_CONFIGS) {
    this.logger = configs.logger || DEF_LOGGER;
    this.i18n = configs.i18n || DEF_I18N;

    this.cliEngine = new CliEngine({
      logger: this.logger,
      i18n: this.i18n,
    });

    this.log('info', 'Initialized');
  }

  run = command => {
    if (command === 'add cli logger') {
      return new Promise((resolve) => {
        this.logger = this.cliEngine.getLogger();
        this.cliEngine.setLogger(this.logger);
        resolve(null);
      });
    }
    else if (command === 'add cli i18n') {
      return new Promise((resolve) => {
        this.i18n = this.cliEngine.getI18n();
        this.cliEngine.setI18n(this.i18n);
        resolve(null);
      });
    }
    else {
      return this.cliEngine.run(command);
    }
  }

  log = (level=DEF_LEVEL, msg) => {
    const msgI18n = this.i18n ? this.i18n.t(msg) : msg;
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

module.exports = Cli;
