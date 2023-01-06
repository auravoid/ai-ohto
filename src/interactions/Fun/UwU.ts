import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    CommandInteraction,
} from 'discord.js';
import { Command } from '@/Command';
import Uwuifier from 'uwuifier';

export const UwU: Command = {
    name: 'uwu',
    description: 'UwU~',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'text',
            description: 'The text you want to uwu-ify.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        // @ts-ignore
        const text = interaction.options.getString('text', true);

        const uwu = new Uwuifier();

        await interaction.followUp({
            ephemeral: false,
            content: uwu.uwuifySentence(text),
        });
    },
};
