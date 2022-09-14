const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class StatsCommands extends Command {
  constructor(client) {
    super(client, {
      name: 'roles',
      memberName: 'roles',
      group: 'divers',
      description:
        'Lists the server roles and the number of members in each role.',
    });
  }

  async run(msg) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `${this.client.user.tag}`,
        `${this.client.user.displayAvatarURL()}`
      )
      .setColor('BLUE')
      .setTimestamp(new Date().toLocaleDateString());

    const guildMembers = msg.guild.members.cache;

    msg.guild.roles.cache.map((role) => {
      const countMembersOfRole = guildMembers.filter((member) =>
        member.roles.cache.has(role.id)
      ).size;

      embed.addField(
        role.name.replace('@everyone', 'ALL'),
        countMembersOfRole,
        true
      );
    });

    return msg.say(embed);
  }
};
