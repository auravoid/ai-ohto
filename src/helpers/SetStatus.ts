import { ActivityType, Client } from 'discord.js';

export default (client: Client): void => {
    if (!client.user || !client.application) {
        return;
    }

    const statusList = [
        {
            type: ActivityType.Watching,
            name: 'new commands soon!',
            url: undefined,
        },
        {
            type: ActivityType.Competing,
            name: 'a fight with other bots',
            url: undefined,
        },
        { type: 2, name: 'my melodies', url: undefined },
        {
            type: ActivityType.Playing,
            name: 'with Neiru, Rika, and Momoe',
            url: undefined,
        },
        { type: ActivityType.Playing, name: 'with eggs', url: undefined },
        {
            type: ActivityType.Playing,
            name: 'with my friends',
            url: undefined,
        },
        {
            type: ActivityType.Watching,
            name: 'https://auravoid.dev',
            url: undefined,
        },
        {
            type: ActivityType.Watching,
            name: 'my friends',
            url: undefined,
        },
        { type: ActivityType.Watching, name: 'the stars', url: undefined },
        {
            type: ActivityType.Watching,
            name: 'the moon',
            url: undefined,
        },
        {
            type: ActivityType.Watching,
            name: 'over {guilds} servers',
            url: undefined,
        },
        {
            type: ActivityType.Watching,
            name: 'over {users} users',
            url: undefined,
        },
        { type: ActivityType.Watching, name: 'the world burn', url: undefined },
    ];

    function statusLoop() {
        const i = Math.floor(Math.random() * statusList.length);

        if (statusList[i].name.includes('{guilds}')) {
            statusList[i].name = statusList[i].name.replace(
                '{guilds}',
                client.guilds.cache.size.toString()
            );
        }

        if (statusList[i].name.includes('{users}')) {
            let totalMembers = 0;
            for (const guild of client.guilds.cache) {
                totalMembers += guild[1].memberCount;
            }
            statusList[i].name = statusList[i].name.replace(
                '{users}',
                totalMembers.toString()
            );
        }

        client.user!.setActivity(statusList[i].name, {
            type: statusList[i].type,
            url: statusList[i].url,
        });

        setTimeout(statusLoop, 1000 * 60 * 5);
    }

    statusLoop();
};
