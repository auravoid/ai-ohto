import {
    ChatInputCommandInteraction,
    Client,
    ContextMenuCommandInteraction,
    EmbedBuilder,
    Interaction,
} from 'discord.js';
import { CommandMap } from '@/Commands';
const { BOT_SERVER } = process.env;

export default async function handleInteraction(
    client: Client,
    interaction: Interaction
) {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
        await handleSlashCommand(client, interaction);
    }
}

const handleSlashCommand = async (
    client: Client,
    interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction
): Promise<void> => {
    const cmd = CommandMap[interaction.commandName];
    if (!cmd) {
        console.warn(
            `[handleSlashCommand] Command ${interaction.commandName} not found`
        );
        return;
    }

    await interaction.deferReply();

    try {
        await cmd.run(client, interaction);
    } catch (err: any) {
        console.group(
            `[handleSlashCommand] Error in command ${interaction.commandName}`
        );
        console.info(
            `Guild: ${interaction.guild?.name} (${interaction.guildId})`
        );
        console.info(`User: ${interaction.user.tag} (${interaction.user.id})`);

        if (interaction.options && interaction.options.data.length > 0) {
            console.info('Options:');
            interaction.options.data.forEach((option) => {
                console.info(
                    `  ${option.name}: ${option.value} (${option.type})`
                );
            });
        }

        console.groupEnd();

        const embed = new EmbedBuilder()
            .setTitle('There was an error while executing this command!')
            .setDescription(
                `There was an error while executing this command! Please try again later. If this error persists, please join the [support server](${
                    BOT_SERVER as string
                }) and report this error.`
            );

        await interaction
            .followUp({
                embeds: [embed],
                ephemeral: true,
            })
            .catch(() => {
                // Welp, we tried
            });
    }
};
