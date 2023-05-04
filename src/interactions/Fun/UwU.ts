import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
} from 'discord.js';
import { Command } from '@/Command';
import Uwuifier from 'uwuifier';

export const UwU: Command = {
    name: 'uwu',
    category: 'Fun',
    description: 'UwU~',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'text',
            description: 'The text you want to uwu-ify.',
            type: ApplicationCommandOptionType.String,
            max_length: 1600,
            required: true,
        },
    ],
    run: async (interaction: ChatInputCommandInteraction) => {
        const text = interaction.options.getString('text', true);

        const uwu = new Uwuifier();

        await interaction.followUp({
            ephemeral: false,
            content: uwu.uwuifySentence(text),
        });
    },
};
