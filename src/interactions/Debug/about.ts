import {
    ChatInputCommandInteraction,
    ColorResolvable,
    EmbedBuilder,
    Guild,
} from 'discord.js';
import { execSync } from 'child_process';
import { getCpuPercentage, getMemory, prettyDate } from '@helpers/Functions';

const { BOT_COLOR } = process.env;
export const gitHash = execSync('git rev-parse --short HEAD', {
    encoding: 'utf-8',
}).trim();

export default async function (
    interaction: ChatInputCommandInteraction
): Promise<void> {
    const embed = new EmbedBuilder()
        .setTitle('Debug Information')
        .addFields(
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
                name: 'Commit Hash',
                value: `\`${gitHash}\``,
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
            }
        )
        .setColor(BOT_COLOR as ColorResolvable);

    await interaction.followUp({
        ephemeral: false,
        embeds: [embed],
    });
}
