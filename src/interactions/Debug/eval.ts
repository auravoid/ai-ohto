import { ChatInputCommandInteraction } from 'discord.js';

export default async function (
    interaction: ChatInputCommandInteraction
): Promise<void> {
    await interaction.followUp({
        content: 'This command is currently disabled, simply because it sucks.',
        ephemeral: true,
    });
}
