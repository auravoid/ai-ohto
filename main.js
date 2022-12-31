const {
    Client,
    Collection,
    GatewayIntentBits,
} = require('discord.js');
const fs = require('fs');
const {
    BOT_TOKEN,
} = process.env;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
});

const { prettyDate } = require('./global/functions.js');

require('./init/deploy.js').execute(client).catch();

client.once('ready', async () => {
    console.log('AWAKEN: Hello World!');
    console.log(`AWAKEN: Loaded ${client.commands.size} commands in ${prettyDate(process.uptime())}`);

    require('./init/status.js').execute(client).catch();
});

client.commands = new Collection();

const commandFolders = fs.readdirSync('./interactions');


for (const folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`./interactions/${folder}`)
        .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./interactions/${folder}/${file}`);
        client.commands.set(command.data.name, command);
    }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    await command.execute(interaction).catch(error => {
        console.log('Error while executing command: ' + interaction.commandName);
        console.error(error);

        interaction.editReply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
        });
    });

});

process.on('unhandledRejection', async error => {
    console.log('Unhandled Rejection:\n', error);
});
process.on('uncaughtException', async error => {
    console.log('Uncaught Exception:\n', error);
});

client.login(BOT_TOKEN).catch(console.error);
