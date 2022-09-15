const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class EmbedCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'embed',
      memberName: 'embed',
      group: 'divers',
      description: 'Envoie un message intégré.',
      ownerOnly: true,
      clientPermissions: ['SEND_MESSAGES'],
      throttling: {
        usages: 2,
        duration: 10,
      },
    });
  }

  async run(msg) {
    const embed = new Discord.MessageEmbed(); // * Création de l'embed

    // * 6000 caractères par message embed
    embed
      .setColor('BLUE') // * ou .setColor(#0099ff)
      .setTitle('Titre du message, maximum 256 caractères.')
      .setAuthor(
        `${this.client.user.tag}`,
        `${this.client.user.displayAvatarURL()}`
      )
      .setDescription("Message contenu dans l'embed, maximum 2048 caractères.")
      // * Footer limité à 2048 caractères
      .setFooter(
        'Pied de page du message.',
        `${this.client.user.displayAvatarURL()}`
      )
      .setTimestamp(new Date().toLocaleDateString())
      // * Maximum de 25 addFields
      .addField(
        // * Sur une ligne complète
        'Titre, maximum 256 caractères',
        'Votre texte, maximum 1024 caractères.'
      )
      // * Plusieurs sur une seule ligne
      .addField('Titre 1', 'Votre texte 1', true)
      .addField('Titre 2', 'Texte avec un lien', true);

    msg.say(embed);
  }
};
