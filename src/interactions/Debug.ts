import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
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
        {
            name: 'guilds',
            description: 'Get a list of guilds the bot is in',
            type: ApplicationCommandOptionType.Subcommand,
            options: [],
        },
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: ChatInputCommandInteraction) => {
        switch (interaction.options.getSubcommand()) {
            case 'about': {
                await import('./Debug/about').then((module) => {
                    module.default(interaction);
                });
                break;
            }
            case 'guilds': {
                await import('./Debug/guilds').then((module) => {
                    module.default(interaction);
                });
                break;
            }
            default: {
                await interaction.followUp({
                    ephemeral: true,
                    content: 'Something went wrong.',
                });
                break;
            }
        }
    },
};
