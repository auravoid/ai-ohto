import { fetch } from 'node-fetch-native';
import { Client } from 'discord.js';

const { KEY_STATCORD, KEY_TOPGG, KEY_BOTSGG, KEY_INFINITY } = process.env;

export async function postBotStats(client: Client) {
    await fetch(
        'https://discord.bots.gg/api/v1/bots/847427963032174613/stats',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: KEY_BOTSGG as string,
            },
            body: JSON.stringify({
                guildCount: client.guilds.cache.size,
            }),
        }
    );

    await fetch('https://top.gg/api/bots/847427963032174613/stats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: KEY_TOPGG as string,
        },
        body: JSON.stringify({
            server_count: client.guilds.cache.size,
        }),
    });
    await fetch('https://statcord.com/bot/847427963032174613', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: KEY_STATCORD as string,
        },
        body: JSON.stringify({
            server_count: client.guilds.cache.size,
        }),
    });
    await fetch(
        'https://infinitybotlist.com/api/bots/847427963032174613/stats',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: KEY_INFINITY as string,
            },
            body: JSON.stringify({
                server_count: client.guilds.cache.size,
            }),
        }
    );
}
