import { Client, ChatInputCommandInteraction, Interaction } from 'discord.js';
import { Commands } from '@/Commands';

export default (client: Client): void => {
    client.on('interactionCreate', async (interaction: Interaction | any) => {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (
    client: Client,
    interaction: ChatInputCommandInteraction
): Promise<void> => {
    const slashCommand = Commands.find(
        (c) => c.name === interaction.commandName
    );
    if (!slashCommand) {
        if (interaction.replied) {
            await interaction.editReply({ content: 'An error has occurred' });
        } else {
            await interaction.reply({ content: 'An error has occurred' });
        }
        return;
    }

    await interaction.deferReply();

    slashCommand.run(client, interaction);
};
