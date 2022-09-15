const CommandoClient = require('./client'); // * Chargement du client de Discord Commando
const path = require('path'); // * Ajout de la librairie path
const fs = require('fs'); // * Ajout de la librairie fileSystem
const dotenv = require('dotenv'); // * Ajout de la librairie dotenv

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const i in envConfig) {
  process.env[i] = envConfig[i];
}

const client = new CommandoClient({
  commandPrefix: '!', // * Préfixe des commandes (ex: ?help)
  owner: process.env.BOT_OWNER_ID, // * ID de l'owner du bot, peut également être un tableau d'id pour plusieurs owners, ex: ['ID1', 'ID2']
  disableMentions: 'everyone', // * Désactiver par sécurité l'utilisation du everyone par le bot
  presence: {
    activity: {
      name: '!help', // * Message de présence
      type: 'LISTENING', // * Type d'activité
    },
  },
});

fs.readdir('./events/', (err, files) => {
  if (err) throw new Error(err);
  files.forEach((file) => {
    const eventFunction = require(`./events/${file}`);
    if (eventFunction.disabled) return;

    const event = eventFunction.event || file.split('.')[0];
    const emitter =
      (typeof eventFunction.emitter === 'string'
        ? client[eventFunction.emitter]
        : eventFunction.emitter) || client;
    const { once } = eventFunction;

    try {
      emitter[once ? 'once' : 'on'](event, (...args) =>
        eventFunction.run(client, ...args)
      );
    } catch (error) {
      throw new Error(error.message || error);
    }
  });
});

client.registry
  .registerDefaultTypes()
  .registerGroups([['divers'], ['admin'], ['bot']]) // * La valeur correspond à la section 'group' de la commande
  .registerCommandsIn(path.join(__dirname, 'commands')); // * Indique où seront les fichiers des commandes du bot

client.login(process.env.BOT_TOKEN);
