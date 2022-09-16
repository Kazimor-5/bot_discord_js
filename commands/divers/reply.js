const { Command } = require('discord.js-commando'); // * Ajout de la librairie discord.js-commando

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'reply',
      memberName: 'reply',
      group: 'divers',
      description: 'Répond à un message.',
      clientPermissions: ['SEND_MESSAGES'],
      throttling: {
        usages: 2,
        duration: 10,
      },
      args: [
        {
          key: 'text',
          prompt: 'Tu vas nin commencé à jouer avec mes couilles hein !?',
          type: 'string',
        },
      ],
    });
  }

  async run(msg, { text }) {
    msg.say(`Toi tu ${text}`);
  }
};
