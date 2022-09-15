const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const HowToApi = require('../../api/HowToApi');

module.exports = class TutoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'tuto',
      memberName: 'tuto',
      aliases: ['howto', 'guide'],
      group: 'divers',
      description: 'Cherche un tutoriel',
      guildOnly: true,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
      args: [
        {
          key: 'query',
          prompt: 'Quel tutoriel cherchez vous ?',
          type: 'string',
          validate: (text) => text.length >= 3,
        },
      ],
      throttling: {
        usages: 2,
        duration: 10,
      },
    });
  }

  async run(msg, { query }) {
    // * Appel à l'API de mTxServ pour rechercher un tutoriel
    const api = new HowToApi();
    const results = await api.search(query);

    const embed = new Discord.MessageEmbed()
      .setTitle(`:mag: Recherche "${query}"`)
      .setColor('BLUE');

    results
      .filter((article) => article.locale === 'fr') // * On supprime les articles en anglais
      // * On  ajoute tous les articles restant à l'embed
      .map((article) =>
        embed.addField(
          `${article.locale === 'fr' ? ':flag_fr:' : ':flag_us:'}, ${
            article.link
          }`
        )
      );

    // * On garde que les 3 derniers résultats
    embed.fields = embed.fields.slice(0, 3);

    return msg.say({ embed });
  }
};
