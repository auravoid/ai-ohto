import {
    ChatInputCommandInteraction,
    Client,
    ContextMenuCommandInteraction,
    Interaction,
} from 'discord.js';
import { CommandMap } from '@/Commands';
import * as console from 'console';

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

        await interaction
            .editReply({
                content: 'There was an error while executing this command!',
            })
            .catch(() => {
                // TODO: Something is very wrong here, take appropriate action
            });
    }
};
