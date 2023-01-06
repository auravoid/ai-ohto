import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    ColorResolvable,
    CommandInteraction,
    EmbedBuilder,
} from 'discord.js';
import { Command } from '@/Command';
import WeebyAPI from 'weeby-js';

const { KEY_WEEBYAPI, BOT_COLOR } = process.env;

const weeby = new WeebyAPI(KEY_WEEBYAPI as string);

export const Interact: Command = {
    name: 'interact',
    description:
        'Interact with another user using a variety of different interactions.',
    options: [
        {
            name: 'user',
            description: 'The user you want to interact with.',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'interaction',
            description: 'The interaction you want to use.',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Cuddle',
                    value: 'cuddle',
                },
                {
                    name: 'Dance',
                    value: 'dance',
                },
                {
                    name: 'High Five',
                    value: 'highfive',
                },
                {
                    name: 'Hug',
                    value: 'hug',
                },
                {
                    name: 'Kiss',
                    value: 'kiss',
                },
                {
                    name: 'Pat',
                    value: 'pat',
                },
                {
                    name: 'Poke',
                    value: 'poke',
                },
                {
                    name: 'Punch',
                    value: 'punch',
                },
                {
                    name: 'Slap',
                    value: 'cuddle',
                },
            ],
        },
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const target = interaction.options.getUser('user', true);
        // @ts-ignore '.getString' is a valid method.
        const type = interaction.options.getString('interaction', true);

        const imgUrl = await weeby.gif.fetch(type);

        const intDesc = {
            cuddle: `<@${target.id}> got cuddles from <@${interaction.user.id}>`,
            dance: `<@${interaction.user.id}> is dancing with <@${target.id}>`,
            highfive: `<@${interaction.user.id}> high fives <@${target.id}>`,
            hug: `<@${interaction.user.id}> gave a hug to <@${target.id}>`,
            kiss: `<@${target.id}> got a kiss from <@${interaction.user.id}>`,
            pat: `<@${interaction.user.id}> pats <@${target.id}>`,
            poke: `<@${target.id}> got booped by <@${interaction.user.id}>`,
            punch: `<@${interaction.user.id}> punches <@${target.id}>`,
            slap: `<@${interaction.user.id}> slaps <@${target.id}>`,
        };

        const embed = new EmbedBuilder()
            .setDescription(intDesc[type as keyof typeof intDesc])
            .setImage(imgUrl)
            .setColor(BOT_COLOR as ColorResolvable);

        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
