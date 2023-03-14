import { ChatInputCommandInteraction } from 'discord.js';

export default async function (
    interaction: ChatInputCommandInteraction
): Promise<void> {
    if (![process.env.BOT_OWNER_ID].includes(interaction.user.id)) {
        await interaction.followUp({
            content: 'You are not authorized to use this command.',
            ephemeral: true,
        });
    } else {
        await interaction.followUp({
            content: "I'm gonna kill myself now.",
            ephemeral: true,
        });

        process.exit(0);
    }
}
