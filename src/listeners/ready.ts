import Status from '@helpers/SetStatus';
import { Client } from 'discord.js';
import { Commands } from '../Commands';

export default (client: Client): void => {
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(await Commands);

        await Status(client);

        console.log(`${client.user.username} is online`);
    });
};
