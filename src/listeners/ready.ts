import Status from '@helpers/SetStatus';
import { Client } from 'discord.js';
import { Commands } from '@/Commands';
import { postCommands } from '@/helpers/CommandPost';
import { postUptime } from '@/helpers/Uptime';
import { postBotStats } from '@/helpers/PostStats';
import auditLogs from './auditLogs';


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

    await postCommands();

    await Status(client);

    await auditLogs(client);

    console.log(`${client.user.username} is online`);

    setInterval(async () => {
        await postUptime(client.ws.ping);
    }, 30 * 1000);

    if (process.env.NODE_ENV === 'production') {
        setInterval(async () => {
            await postBotStats(client);
        }, 30 * 60 * 1000);
    }
}
