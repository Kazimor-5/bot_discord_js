const { Command } = require('discord.js-commando'); // * Ajout de la librairie discord.js-commando

module.exports = class HelloCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hello',
      memberName: 'hello',
      group: 'divers',
      aliases: ['bonjour', 'hi'],
      description: 'Répond avec un message de salutation.',
      guildOnly: false,
      throttling: {
        usages: 2,
        duration: 10,
      },
    });
  }

  async run(msg) {
    msg.say(`Bonjour je suis ${this.client.user.tag}`);
  }
};
