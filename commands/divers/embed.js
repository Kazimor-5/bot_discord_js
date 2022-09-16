const { Command } = require('discord.js-commando'); // * Ajout de la librairie discord.js-commando
const Discord = require('discord.js'); // * Ajout de la librairie discord.js

module.exports = class EmbedCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'presentation',
      memberName: 'presentation',
      aliases: ['présentation', 'p'],
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
      .setTitle(`Salut je suis ${this.client.user.tag} :smile:`)
      .setAuthor(
        `${this.client.user.tag}`,
        `${this.client.user.displayAvatarURL()}`
      )
      .setDescription(`Je suis un bot créé par ${this.client.owners}.`)
      // * Footer limité à 2048 caractères
      .setFooter(
        `Envoyé par ${this.client.user.tag}.`,
        `${this.client.user.displayAvatarURL()}`
      )
      .setTimestamp(new Date().toLocaleDateString())
      // * Maximum de 25 addFields
      .addField(
        // * Sur une ligne complète
        "Pourquoi j'ai été créé ?",
        `J'ai été créé pour que ${this.client.owners} apprenne à coder un bot Discord en JavaScript.`
      );
    // * Plusieurs sur une seule ligne
    // .addField('Titre 1', 'Votre texte 1', true)
    // .addField('Titre 2', 'Texte avec un lien', true);

    msg.say(embed);
  }
};
