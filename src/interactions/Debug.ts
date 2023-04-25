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
        {
            name: 'kill',
            description: 'Kill the bot',
            type: ApplicationCommandOptionType.Subcommand,
            options: [],
        },
        {
            name: 'fetchredis',
            description: 'Fetch something in the Redis database',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'key',
                    description: 'The key to fetch',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
        },
        {
            name: 'promote',
            description: 'Add user to list of authorized users',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'The user to promote',
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
            ],
        },
        {
            name: 'demote',
            description: 'Remove user from list of authorized users',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'The user to demote',
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
            ],
        },
        {
            name: 'usage',
            description: 'Get command usage',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'command',
                    description: 'The command to get usage for',
                    type: ApplicationCommandOptionType.String,
                    required: false,
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
