import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    Client,
} from 'discord.js';
import { Command } from '@/Command';

export const ErrorTest: Command = {
    name: 'test',
    description: 'ErrorTest command',
    type: ApplicationCommandType.ChatInput,
    guildOnly: true,
    options: [
        {
            name: 'string',
            description: 'String option',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'user',
            description: 'User option',
            type: ApplicationCommandOptionType.User,
            required: false,
        },
        {
            name: 'role',
            description: 'Role option',
            type: ApplicationCommandOptionType.Role,
            required: false,
        },
        {
            name: 'channel',
            description: 'Channel option',
            type: ApplicationCommandOptionType.Channel,
            required: false,
        },
        {
            name: 'integer',
            description: 'Integer option',
            type: ApplicationCommandOptionType.Integer,
            required: false,
        },
        {
            name: 'boolean',
            description: 'Boolean option',
            type: ApplicationCommandOptionType.Boolean,
            required: false,
        },
        {
            name: 'number',
            description: 'Number option',
            type: ApplicationCommandOptionType.Number,
            required: false,
        },
    ],
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        throw new Error('Intentionally thrown error for debugging.');

        await interaction.reply({
            ephemeral: true,
            content: "You shouldn't see this. It was suppose to error out!",
        });
    },
};
