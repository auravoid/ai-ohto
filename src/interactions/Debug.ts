import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
} from 'discord.js';
import { Command } from '@/Command';

export const Debug: Command = {
    name: 'debug',
    category: 'Debug',
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
        {
            name: 'eval',
            description: 'Evaluate JavaScript code',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'code',
                    description: 'The code to evaluate',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
        },
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: ChatInputCommandInteraction) => {
        try {
            await import(`./Debug/${interaction.options.getSubcommand()}`).then(
                (module) => {
                    module.default(interaction);
                }
            );
        } catch (error) {
            await interaction.followUp({
                ephemeral: true,
                content: 'Something went wrong.',
            });
        }
    },
};
