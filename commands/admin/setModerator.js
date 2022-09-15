const { Command } = require('discord.js-commando'); // * Ajout de la librairie discord.js-commando
const Discord = require('discord.js'); // * Ajout de la librairie discord.js

module.exports = class SetModeratorCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'set-moderator',
      memberName: 'set-moderator',
      group: 'admin', // * Utilisation du groupe 'admin'
      description:
        'Ajoute le rôle de modérateur à tous les channels et force les permissions.',
      ownerOnly: true,
      guildOnly: true, // * Uniquement dans un channel, pas de DM pour cette commande
    });
  }

  async run(msg) {
    const hasModeratorRole = msg.guild.roles.cache.some(
      (role) => role.name === 'Modérateur' // * Adaptez le nom si vous changez le nom du rôle modérateur
    );

    if (!hasModeratorRole) {
      this.client.logger.log(
        'error',
        "Rôle 'Modérateur' non trouvé sur ce serveur."
      );
      return;
    }

    const roleModerator = msg.guild.roles.cache
      .filter((role) => role.name === 'Modérateur')
      .first();

    msg.guild.channels.cache.map((channel) => {
      this.client.logger.log(
        'info',
        `Rôle 'Modérateur' ajouté sur ${channel.name}`
      );

      // * Surchargement des permissions du rôle 'Modérateur' sur chaque channel du serveur
      channel.createOverwrite(roleModerator.id, {
        ADD_REACTIONS: true, // * Ajout des réactions
        KICK_MEMBERS: true, // * Kick un membre
        BAN_MEMBERS: true, // * Ban un membre
        VIEW_AUDIT_LOG: true, // * Voir les audits
        VIEW_CHANNEL: true, // * Voir tous les channels
        READ_MESSAGES: true, // * Voir les nouveaux messages
        SEND_MESSAGES: true, // * Envoyer des messages
        SEND_TTS_MESSAGES: false, // * Envoyer des messages TTS
        MANAGE_MESSAGES: true, // * Pouvoir modérer les messages
        EMBED_LINKS: true, // * Envoyer des liens sous format intégré
        ATTACH_FILES: true, // * Envoyer des fichiers
        READ_MESSAGES_HISTORY: true, // * Voir les anciens messages
        MENTION_EVERYONE: false, // * Pouvoir mentionner @everyone
        USE_EXTERNAL_EMOJIS: true, // * Utiliser les emojis d'autre serveurs
        EXTERNAL_EMOJIS: true, // * Utiliser les émojis externe
        SPEAK: true, // * Parler dans les channels vocals
        CONNECT: true, // * Se connecter aux channels vocals
        MUTE_MEMBERS: true, // * Muter les membres
        DEAFEN_MEMBERS: true, // * Mettre les membres en sourdine
        MOVE_MEMBERS: true, // * Déplacer les membres
        USE_VAD: true,
        CHANGE_NICKNAME: true, // * Changer les pseudos
        MANAGES_NICKNAMES: true, // * Modérer les pseudos
      });
    });

    const embed = new Discord.MessageEmbed()
      .setDescription(
        `Mise à jour des permissions pour le rôle ${roleModerator.name}`
      )
      .setColor('GREEN');

    return msg.say(embed);
  }
};
