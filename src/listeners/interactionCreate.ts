import { Client, CommandInteraction, Interaction } from 'discord.js';
import { CommandMap } from '../Commands';

export default (client: Client): void => {
    client.on('interactionCreate', async (interaction: Interaction | any) => {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (
    client: Client,
    interaction: CommandInteraction
): Promise<void> => {
    const cmd = CommandMap[interaction.commandName];
    if (!cmd) {
        console.warn(`[handleSlashCommand] Command ${interaction.commandName} not found`);
        return;
    }

    await interaction.deferReply();

    try {
        await cmd.run(client, interaction);
    } catch (err: any) {
        // TODO: You probably want to handle this better, maybe log interaction info, args etc
        console.error(err);
        await interaction.editReply({
            content: 'There was an error while executing this command!',
        }).catch(() => {
            // TODO: Something is very wrong here, take appropriate action
        });
    }
};
