import './bootstrap';

import { Client, GatewayIntentBits } from 'discord.js';
import { basename, join } from 'path';
import './helpers/glob';
import { mapScripts } from '@helpers/glob';

const { BOT_TOKEN } = process.env;

console.log('Bot is starting...');

const client = new Client({
    intents:
        GatewayIntentBits.Guilds |
        GatewayIntentBits.GuildMembers |
        GatewayIntentBits.GuildMessages |
        GatewayIntentBits.MessageContent,
});

mapScripts(join(__dirname, 'listeners'), async (file) => {
    const listener = (await import(file).then(
        (exports) => exports.default
    )) as Function;
    if (!listener || typeof listener !== 'function') {
        throw new Error(`Listener ${file} must export a default function`);
    }

    const isOnce = listener.name.startsWith('once');
    // slice -3 strips the .ts/.js extension
    // .bind(null, client) will make the "this" reference in the function be null, and pass client as first arg
    client[isOnce ? 'once' : 'on'](
        basename(file).slice(0, -3),
        listener.bind(null, client)
    );
}).catch(console.error);

client.login(BOT_TOKEN).catch(console.error);
