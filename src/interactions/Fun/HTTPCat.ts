import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
} from 'discord.js';
import { Command } from '@/Command';

const httpCodes = [
    100, 101, 102, 103, 200, 201, 202, 203, 204, 206, 207, 300, 301, 302, 303,
    304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410,
    411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 429,
    431, 444, 450, 451, 497, 498, 499, 500, 501, 502, 503, 504, 506, 507, 508,
    509, 510, 511, 521, 522, 523, 525, 599,
];

export const HTTPCat: Command = {
    name: 'httpcat',
    description: 'Get a random HTTP cat or look up a specific one!',
    options: [
        {
            name: 'code',
            description: 'The HTTP status code to look up',
            type: ApplicationCommandOptionType.Integer,
            min_value: 100,
            max_value: 599,
            required: false,
        },
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: ChatInputCommandInteraction) => {
        const code =
            interaction.options.getInteger('code', false) ||
            httpCodes[Math.floor(Math.random() * httpCodes.length)];

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setTitle(`HTTP ${code}`)
            .setImage(`https://http.cat/${code}.jpg`);

        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
