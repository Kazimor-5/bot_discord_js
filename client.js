const { CommandoClient } = require('discord.js-commando'); // * Ajout de la librairie discord.js-commando
const winston = require('winston'); // * Ajout de la librairie winston

module.exports = class BotClient extends CommandoClient {
  constructor(options) {
    super(options);

    // * Initialisation du logger
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'console.log' }),
      ],
      format: winston.format.printf(
        (log) =>
          `[${new Date().toLocaleString()}] - [${log.level.toUpperCase()}] - ${
            log.message
          }`
      ),
    });

    this.on('debug', (message) => this.logger.log('debug', message));
    this.on('warn', (message) => this.logger.log('warn', message));
    this.on('error', (message) => this.logger.log('error', message));

    process.on('uncaughtException', (error) => this.logger.log('error', error));
  }
};
