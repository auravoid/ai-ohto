import Status from '@helpers/SetStatus';
import { Client } from 'discord.js';
import { Commands } from '@/Commands';

const { BOT_HOME_GUILD } = process.env;

export default async function onceReady(client: Client) {
    if (!client.user || !client.application) {
        return;
    }

    const globalCommands = (await Commands).filter((cmd) => !cmd.guildOnly);
    const guildCommands = (await Commands).filter((cmd) => cmd.guildOnly);

    await client.guilds.cache
        .get(BOT_HOME_GUILD as string)
        ?.commands.set(guildCommands);

    await client.application.commands.set(globalCommands);

    await Status(client);

    console.log(`${client.user.username} is online`);
}
