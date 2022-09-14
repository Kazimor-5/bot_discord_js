module.exports = {
  run: (client) => {
    client.logger.log(
      'info',
      `Bot identifié en tant que ${client.user.tag} ! (${client.user.id})`
    );

    const updateActivity = () => {
      client.user.setActivity(`${client.guilds.cache.size} serveur(s)`, {
        type: 'LISTENING',
      });
    };

    updateActivity(); // * Le bot est 'ready', on initialise le d'activité. Ensuite , le setInterval() permettra de rafraîchir le message toutes les 5 mins.

    client.setInterval(() => updateActivity(), 5000 * 60); // * Toutes les 5 mins après le lancement du bot, le message sera mis à jour et le compteur rafraîchi.
  },
};
