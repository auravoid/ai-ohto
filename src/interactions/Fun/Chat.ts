import {
    ApplicationCommandType,
    ApplicationCommandOptionType,
    Client,
    CommandInteraction,
    EmbedBuilder,
} from 'discord.js';
import { Command } from '@/Command';
import fetch from 'node-fetch-native';

export const Chat: Command = {
    name: 'chat',
    description: 'Send messages into the chat',
    options: [
        {
            name: 'type',
            description: 'What would you like to be said?',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Joke',
                    value: 'joke',
                },
                {
                    name: 'Pickup Line',
                    value: 'pickup',
                },
                {
                    name: 'Roast',
                    value: 'roast',
                },
                {
                    name: 'Toast',
                    value: 'toast',
                },
                {
                    name: 'Topic',
                    value: 'topic',
                },
            ],
        },
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        // @ts-ignore '.getString' is a valid method, but TypeScript doesn't know that. And TypeScript is dumb.
        const type = interaction.options.getString('type', true);

        const response = await fetch('https://api.auravoid.dev/fun/' + type);
        const body = await response.json();

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setDescription(body.data);

        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
