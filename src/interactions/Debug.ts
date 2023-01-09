import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    Client,
} from 'discord.js';
import { Command } from '@/Command';

export const Debug: Command = {
    name: 'debug',
    description: 'Debug commands for authorized users',
    guildOnly: true,
    options: [
        {
            name: 'about',
            description: 'Get information about the bot',
            type: ApplicationCommandOptionType.Subcommand,
            options: [],
        },
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        switch (interaction.options.getSubcommand()) {
            case 'about': {
                await import('./Debug/about').then((module) => {
                    module.default(interaction);
                });
            }
        }
    },
};
