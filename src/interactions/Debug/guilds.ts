import {
    ChatInputCommandInteraction,
    ColorResolvable,
    EmbedBuilder,
} from 'discord.js';

const { BOT_COLOR } = process.env;

export default async function (
    interaction: ChatInputCommandInteraction
): Promise<void> {
    const embed = new EmbedBuilder()
        .setTitle('Guilds')
        .setDescription(
            (await interaction.client.guilds.fetch())
                .map((g) => `\`${g.id}\` - ${g.name}`)
                .join('\n')
        )
        .setColor(BOT_COLOR as ColorResolvable);

    await interaction.followUp({ embeds: [embed] });
}
