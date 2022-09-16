const { Command } = require('discord.js-commando'); // * Ajout de la librairie discord.js-commando
const Discord = require('discord.js'); // * Ajout de la librairie discord.js

module.exports = class RickRollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'rkrl',
      memberName: 'rkrl',
      group: 'divers',
      description:
        "J'existe pour te 01010010 01101001 01100011 01101011 00100000 01110010 01101111 01101100 01101100 01100101 01100100. Oups un léger dysfonctionnement ! :sweat_smile:",
      clientPermissions: ['SEND_MESSAGES'],
      throttling: {
        usages: 2,
        duration: 10,
      },
    });
  }

  async run(msg) {
    const embed = new Discord.MessageEmbed(); // * Création de l'embed

    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    embed
      .setColor('BLUE')
      .setTitle('Détails du bot :nerd:')
      .setDescription('Trouves tout les détails du bot')
      .setFooter(
        `Envoyé par ${this.client.user.tag}`,
        `${this.client.user.displayAvatarURL()}`
      )
      .setTimestamp(new Date())
      .setURL(`${url}`);

    msg.say(embed);
  }
};
