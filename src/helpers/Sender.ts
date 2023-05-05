import {
    Client,
    ColorResolvable,
    CommandInteraction,
    EmbedBuilder,
    TextChannel,
} from 'discord.js';
import { prettyDate } from '@helpers/Functions';
const { homepage } = require('@/../package.json');

const {
    BOT_HOME_GUILD,
    BOT_HOME_CHANNEL,
    RAILWAY_GIT_COMMIT_SHA,
    RAILWAY_GIT_COMMIT_MESSAGE,
} = process.env;

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
                value: `[\`${RAILWAY_GIT_COMMIT_SHA?.substring(0, 7)}\`](${
                    homepage + '/commit/' + RAILWAY_GIT_COMMIT_SHA
                })`,
                inline: true,
            },
            {
                name: 'Commit Message',
                value: `${RAILWAY_GIT_COMMIT_MESSAGE}`,
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
