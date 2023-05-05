import {
    ChatInputCommandInteraction,
    ColorResolvable,
    EmbedBuilder,
    Guild,
} from 'discord.js';
import { getCpuPercentage, getMemory, prettyDate } from '@helpers/Functions';
import { Commands } from '@/Commands';

const { homepage } = require('@/../package.json');
const { BOT_COLOR, RAILWAY_GIT_COMMIT_MESSAGE, RAILWAY_GIT_COMMIT_SHA } =
    process.env;

export default async function (
    interaction: ChatInputCommandInteraction
): Promise<void> {
    const embed = new EmbedBuilder()
        .setTitle('Debug Information')
        .addFields(
            {
                name: 'Command Count',
                value: `${(await Commands).length}`,
                inline: true,
            },
            {
                name: 'Guild Count',
                value: `${(await interaction.client.guilds.fetch()).size}`,
                inline: true,
            },
            {
                name: 'User Count',
                value: `${interaction.client.guilds.cache.reduce(
                    (a: number, b: Guild) => a + b.memberCount,
                    0
                )}`,
                inline: true,
            },
            {
                name: 'Process Uptime',
                value: `${prettyDate(process.uptime())}`,
                inline: true,
            },
            {
                name: 'Node Version',
                value: `${process.version}`,
                inline: true,
            },
            {
                name: 'D.js Version',
                value: `${require('discord.js').version}`,
                inline: true,
            },
            {
                name: 'Operating System',
                value: `${process.platform}`,
                inline: true,
            },
            {
                name: 'Memory Usage',
                value: getMemory(),
                inline: true,
            },
            {
                name: 'CPU Usage',
                value: `${getCpuPercentage().toFixed(2)}%`,
                inline: true,
            },
            {
                name: 'Commit Hash',
                value: `[\`${RAILWAY_GIT_COMMIT_SHA?.substring(0, 7)}\`](${
                    homepage + '/commit/' + RAILWAY_GIT_COMMIT_SHA
                })`,
                inline: true,
            },
            {
                name: 'Commit Message',
                value: `\`${RAILWAY_GIT_COMMIT_MESSAGE}\``,
                inline: true,
            }
        )
        .setColor(BOT_COLOR as ColorResolvable);

    await interaction.followUp({
        ephemeral: false,
        embeds: [embed],
    });
}
