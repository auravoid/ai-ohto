import { ApplicationCommandType, Client, CommandInteraction } from 'discord.js';
import { Command } from '@/Command';


export const GetUser: Command = {
    name: 'Get User',
    description: 'Get a user\'s information',
    type: ApplicationCommandType.User as ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        await interaction.followUp({
            ephemeral: false,
            embeds: [],
        });
    },
};
