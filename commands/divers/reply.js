const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'reply',
      memberName: 'reply',
      group: 'divers',
      description: 'Reply',
      clientPermissions: ['SEND_MESSAGES'],
      throttling: {
        usages: 2,
        duration: 10,
      },
      args: [
        {
          key: 'text',
          prompt: "Tu vas nin commencé à m'choper par l'colback !?",
          type: 'string',
        },
      ],
    });
  }

  async run(msg, { text }) {
    msg.say(`Toi tu ${text}`);
  }
};
