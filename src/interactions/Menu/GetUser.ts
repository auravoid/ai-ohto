import { Command } from '@/Command';
import {
    ApplicationCommandType,
    ContextMenuCommandInteraction,
} from 'discord.js';

export const GetUser: Command = {
    name: 'Get User',
    category: 'Menu',
    type: ApplicationCommandType.User,
    run: async (interaction: ContextMenuCommandInteraction) => {
        await interaction.followUp({
            ephemeral: false,
            content: 'Something will be here soon.',
        });
    },
};
