import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
} from 'discord.js';
import { Command } from '@/Command';
import { idToTimestamp } from '@helpers/Functions';

export const Snowflake: Command = {
    name: 'snowflake',
    description: 'Convert a snowflake ID to a date.',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'id',
            description: 'The snowflake ID to convert.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'format',
            description: 'The format to display the date in.',
            type: ApplicationCommandOptionType.String,
            required: false,
            choices: [
                {
                    name: 'Short Date',
                    value: 'short-date',
                },
                {
                    name: 'Long Date',
                    value: 'long-date',
                },
                {
                    name: 'Short Time',
                    value: 'short-time',
                },
                {
                    name: 'Long Time',
                    value: 'long-time',
                },
                {
                    name: 'Short Datetime',
                    value: 'short-datetime',
                },
                {
                    name: 'Long Datetime',
                    value: 'long-datetime',
                },
                {
                    name: 'Relative',
                    value: 'relative',
                },
            ],
        },
    ],
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const snowflake = interaction.options.getString('id');
        const format = interaction.options.getString('format');

        if (isNaN(snowflake as unknown as number)) {
            return interaction.followUp({
                content: 'Please provide a valid snowflake ID.',
                ephemeral: true,
            });
        }

        if ((snowflake as unknown as number) < 4194304) {
            return interaction.followUp({
                content:
                    "That doesn't look like a snowflake. Snowflakes are much larger numbers.",
                ephemeral: true,
            });
        }

        const date = idToTimestamp(
            snowflake as unknown as number,
            format ?? 'long-datetime'
        );

        const embed = new EmbedBuilder()
            .setTitle('Snowflake ID')
            .setDescription(`\`${snowflake}\` is ${date}.`)
            .setColor(0x00ae86);

        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
