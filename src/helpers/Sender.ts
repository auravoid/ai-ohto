import { CommandInteraction, EmbedBuilder } from 'discord.js';

const { BOT_HOME_GUILD, BOT_HOME_CHANNEL } = process.env;

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
        // @ts-ignore
        channel.send({ embeds: [embed] });
    }
}
