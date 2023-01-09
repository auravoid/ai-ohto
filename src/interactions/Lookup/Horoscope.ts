import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
} from 'discord.js';
import { Command } from '@/Command';
import fetch from 'node-fetch-native';

export const Horoscope: Command = {
    name: 'horoscope',
    description: 'Lookup your horoscope for the day',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'sign',
            description: 'The sign to lookup',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Aries',
                    value: 'aries',
                },
                {
                    name: 'Taurus',
                    value: 'taurus',
                },
                {
                    name: 'Gemini',
                    value: 'gemini',
                },
                {
                    name: 'Cancer',
                    value: 'cancer',
                },
                {
                    name: 'Leo',
                    value: 'leo',
                },
                {
                    name: 'Virgo',
                    value: 'virgo',
                },
                {
                    name: 'Libra',
                    value: 'libra',
                },
                {
                    name: 'Scorpio',
                    value: 'scorpio',
                },
                {
                    name: 'Sagittarius',
                    value: 'sagittarius',
                },
                {
                    name: 'Capricorn',
                    value: 'capricorn',
                },
                {
                    name: 'Aquarius',
                    value: 'aquarius',
                },
                {
                    name: 'Pisces',
                    value: 'pisces',
                },
            ],
        },
    ],
    run: async (interaction: ChatInputCommandInteraction) => {
        const sign = interaction.options.getString('sign');

        const response = await fetch(
            'https://ohmanda.com/api/horoscope/' + sign
        );
        const horoscopeData = await response.json();

        const horoscopeName =
            (sign as string).charAt(0).toUpperCase() +
            (sign as string).slice(1);

        const embed = new EmbedBuilder()
            .setTitle(`Horoscope for ${horoscopeName} for today!`)
            .setDescription(horoscopeData.horoscope)
            .setColor('#e083ce');

        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
