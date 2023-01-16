import { fetch } from 'node-fetch-native';
import { Client } from 'discord.js';

const { KEY_STATCORD, KEY_TOPGG, KEY_BOTSGG, KEY_INFINITY } = process.env;

export async function postBotStats(client: Client) {
    const guilds = client.guilds.cache.size;

    await fetch(
        `https://discord.bots.gg/api/v1/bots/${client.user?.id}/stats`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: KEY_BOTSGG as string,
            },
            body: JSON.stringify({
                guildCount: guilds,
            }),
        }
    );

    await fetch(`https://top.gg/api/bots/${client.user?.id}/stats`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: KEY_TOPGG as string,
        },
        body: JSON.stringify({
            server_count: guilds,
        }),
    });
    await fetch(`https://statcord.com/bot/${client.user?.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: KEY_STATCORD as string,
        },
        body: JSON.stringify({
            server_count: guilds,
        }),
    });
    await fetch(
        `https://infinitybotlist.com/api/bots/${client.user?.id}/stats`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: KEY_INFINITY as string,
            },
            body: JSON.stringify({
                server_count: guilds,
            }),
        }
    );
}
