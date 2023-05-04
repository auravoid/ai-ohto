import {
    Client,
    ColorResolvable,
    CommandInteraction,
    EmbedBuilder,
    TextChannel,
} from 'discord.js';
import { prettyDate } from '@helpers/Functions';
import { execSync } from 'child_process';
import { dateToTimestamp } from './Functions';

const { BOT_HOME_GUILD, BOT_HOME_CHANNEL } = process.env;
export const gitHash = execSync('git rev-parse --short HEAD', {
    encoding: 'utf-8',
}).trim();
export const gitDate = execSync('git show -s --format=%ci', {
    encoding: 'utf-8',
}).trim();
export const gitMessage = execSync('git show -s --format=%s', {
    encoding: 'utf-8',
}).trim();

export async function onStartup(client: Client): Promise<void> {
    const embed = new EmbedBuilder()
        .setTitle(`Online!`)
        .setDescription('The bot is online and ready to go!')
        .setColor(process.env.BOT_COLOR as ColorResolvable)
        .addFields(
            {
                name: 'Guilds',
                value: `${client.guilds.cache.size}`,
                inline: true,
            },
            {
                name: 'Command Count',
                value: `${client.application?.commands.cache.size}`,
                inline: true,
            },
            {
                name: 'Loaded In',
                value: `${prettyDate(process.uptime())}`,
                inline: true,
            },
            {
                name: 'Commit SHA',
                value: `\`${gitHash}\``,
                inline: true,
            },
            {
                name: 'Commit Date',
                value: `${dateToTimestamp(
                    new Date(gitDate).getTime(),
                    'long-date'
                )}`,

                inline: true,
            },
            {
                name: 'Commit Message',
                value: `${gitMessage}`,
                inline: true,
            }
        )
        .setTimestamp();
    const channel = await client.guilds.cache
        .get(BOT_HOME_GUILD as string)
        ?.channels.cache.get(BOT_HOME_CHANNEL as string);

    if (process.env.environment === 'production') {
        if (channel) {
            await (channel as TextChannel).send({ embeds: [embed] });
        }
    }
}

export async function onError(
    error: Error,
    interaction: CommandInteraction
): Promise<void> {
    const embed = new EmbedBuilder()
        .setTitle(`There was an error handling ${interaction.commandName}!`)
        .setColor(0xff0000)
        .setDescription(`\`\`\`\n${error}\n\`\`\``)
        .addFields(
            {
                name: 'Guild',
                value: `${interaction.guild?.name} (\`${interaction.guildId}\`)`,
                inline: false,
            },
            {
                name: 'User',
                value: `${interaction.user.tag} (\`${interaction.user.id}\`)`,
                inline: false,
            },
            {
                name: 'Command',
                value: `\`${interaction.commandName}\``,
                inline: false,
            },
            {
                name: 'Options',
                value:
                    interaction.options.data
                        .map(
                            (option) =>
                                `\`${option.name}\`: \`${
                                    (option.value?.toString()
                                        .length as number) > 20
                                        ? option.value?.toString().slice(0, 5) +
                                          ' [...] ' +
                                          option.value?.toString().slice(-5)
                                        : option.value?.toString()
                                }\``
                        )
                        .join('\n') || 'None',
                inline: false,
            }
        );

    const channel = await interaction.client.guilds.cache
        .get(BOT_HOME_GUILD as string)
        ?.channels.cache.get(BOT_HOME_CHANNEL as string);

    if (channel) {
        await (channel as TextChannel).send({ embeds: [embed] });
    }
}
function uglyDate(uptime: () => number) {
    throw new Error('Function not implemented.');
}
