const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const paginationEmbed = require('discord.js-pagination');

module.exports = class PagerCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pager',
      memberName: 'pager',
      group: 'divers',
      description: 'Test de la pagination',
      ownerOnly: true,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
      throttling: {
        usages: 2,
        duration: 10,
      },
    });
  }

  async run(msg) {
    const data = [
      {
        titre: 'Titre 1',
        texte:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, velit.',
      },
      {
        titre: 'Titre 2',
        texte:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius, error.',
      },
      {
        titre: 'Titre 3',
        texte:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, porro?',
      },
    ];

    const page = [];

    for (const item of data) {
      const embed = new Discord.MessageEmbed()
        .setTitle(item.titre)
        .setDescription(item.texte);

      page.push(embed);
    }

    paginationEmbed(msg, page);
  }
};
