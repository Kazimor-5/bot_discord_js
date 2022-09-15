const { Command } = require('discord.js-commando'); // * Ajout de la librairie discord.js-commando
const CatApi = require('../../api/CatApi'); // * Ajout de la classe CatApi

module.exports = class CatCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'cat',
      memberName: 'cat',
      aliases: ['chat'],
      group: 'divers',
      description: 'Affiche une image aléatoire de chat',
      guildOnly: true,
      clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
      throttling: {
        usages: 2,
        duration: 10,
      },
    });
  }

  async run(msg) {
    const api = new CatApi();
    const images = await api.random();

    if (!images.length) return;

    msg.say({
      files: [images[0].url],
    });
  }
};
