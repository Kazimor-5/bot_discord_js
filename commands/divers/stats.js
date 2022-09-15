const { Command } = require('discord.js-commando'); // * Ajout de la librairie discord.js-commando
const Discord = require('discord.js'); // * Ajout de la librairie discord.js

module.exports = class StatsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'stats',
      memberName: 'stats',
      group: 'divers',
      description:
        'Affiche le nombre de serveurs Discord où le bot est présent.',
    });
  }

  async run(msg) {
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `Je suis présent sur **${this.client.guilds.cache.size} serveur(s)** :heart:`
      )
      .setColor('BLUE');

    return msg.say(embed);
  }
};
