const CommandoClient = require('./client'); // * Chargement du client de Discord Commando
const path = require('path'); // * On ajoute la librairie path
const fs = require('fs'); // * On ajoute la librairie fileSystem
const dotenv = require('dotenv'); // * On ajoute la librairie dotenv

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const i in envConfig) {
  process.env[i] = envConfig[i];
}

const client = new CommandoClient({
  commandPrefix: '!', // * Préfixe des commandes (ex: ?help)
  owner: process.env.BOT_OWNER_ID, // * ID de l'owner du bot, peut également être un tableau d'id pour plusieurs owners, ex: ['ID1', 'ID2']
  disableMentions: 'everyone', // * Désactive, par sécurité, l'utilisation du everyone par le bot
  presence: {
    activity: {
      name: `!help`, // * Message de présence
      type: 'LISTENING', // * Type d'activité
    },
  },
});

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
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
      console.error(error);
    }
  });
});

client.registry
  .registerDefaultTypes()
  .registerGroups([['divers'], ['admin'], ['bot']]) // * la première valeur correspond à la section 'group' de votre commande, la deuxième valeur sera utilisée pour l'affichage du nom du groupe, dans l'aide par exemple
  .registerCommandsIn(path.join(__dirname, 'commands')); // * On indique où seront les fichiers des commandes du bot

client.login(process.env.BOT_TOKEN);
