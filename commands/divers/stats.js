const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class StatsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'stats',
      memberName: 'stats',
      group: 'divers',
      description:
        "Display the number of Discord's servers where the bot is currently",
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
