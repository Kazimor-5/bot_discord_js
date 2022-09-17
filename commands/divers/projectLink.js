const { Command } = require('discord.js-commando'); // * Ajout de la librairie discord.js-commando
const Discord = require('discord.js');

module.exports = class ProjetLink extends Command {
  constructor(client) {
    super(client, {
      name: 'projet',
      memberName: 'projet',
      group: 'divers',
      description: 'Donne le lien du projet sur GitHub',
      clientPermissions: ['SEND_MESSAGES'],
      throttling: {
        usages: 2,
        duration: 10,
      },
    });
  }

  async run(msg) {
    const embed = new Discord.MessageEmbed();
    const image = 'https://shorturl.at/cDO47';

    embed
      .setColor('BLUE')
      .setTitle('Lien du projet')
      .setAuthor(
        `${this.client.user.tag}`,
        `${this.client.user.displayAvatarURL()}`
      )
      .setDescription(
        `Si vous voulez récupérer le code source de ${this.client.user.tag} créé par ${this.client.owners} vous n'avez qu'à cliquer sur le lien.`
      )
      .setFooter(
        `Envoyé par ${this.client.user.tag}`,
        `${this.client.user.displayAvatarURL()}`
      )
      .setTimestamp(new Date())
      .setURL('https://github.com/Kazimor-5/bot_discord_js.git')
      .setImage(`${image}`);

    msg.say(embed);
  }
};
