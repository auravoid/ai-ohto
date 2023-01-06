import {
    Client,
    ChatInputCommandInteraction,
    Interaction,
    ContextMenuCommandInteraction,
} from 'discord.js';
import { Commands } from '@/Commands';
import { CommandMap } from '../Commands';

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
        // TODO: You probably want to handle this better, maybe log interaction info, args etc
        console.error(err);
        await interaction
            .editReply({
                content: 'There was an error while executing this command!',
            })
            .catch(() => {
                // TODO: Something is very wrong here, take appropriate action
            });
    }
};
