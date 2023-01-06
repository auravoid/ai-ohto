import { Command } from '@/Command';
import { ApplicationCommandType, Client, CommandInteraction } from 'discord.js';

export const GetUser: Command = {
    name: 'Get User',
    type: ApplicationCommandType.User,
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.followUp({
            ephemeral: false,
            embeds: [],
        });
    },
};
