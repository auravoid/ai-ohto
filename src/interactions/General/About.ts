import {
    ApplicationCommandType,
    ChatInputCommandInteraction,
    Client,
    ColorResolvable,
    EmbedBuilder,
} from 'discord.js';
import { Command } from '@/Command';
import { prettyDate } from '@helpers/Functions';

const { BOT_COLOR, RAILWAY_GIT_COMMIT_SHA } = process.env;

export const About: Command = {
    name: 'about',
    description: 'Get some details about the bot.',
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const embed = new EmbedBuilder()
            .setTitle('About Me')
            .setDescription(
                `This bot was made by **[auravoid#6669](https://auravoid.dev/)**
Need help? Join the [support server](https://discord.gg/Ycen3xRUJb)!
Concerns about privacy? Read the [privacy policy](https://auravoid.dev/privacy).
			
The character "Ai Ohto" is from the anime "[Wonder Egg Priority](https://wonder-egg-priority.com/)" produced by [CloverWorks](https://en.cloverworks.co.jp/).`
            )
            .setColor(BOT_COLOR as ColorResolvable)
            .addFields(
                {
                    name: 'Commit SHA',
                    value: `\`${RAILWAY_GIT_COMMIT_SHA!.substring(0, 7)}\``,
                    inline: true,
                },
                {
                    name: 'Library',
                    value: `[Discord.js v${
                        require('discord.js').version
                    }](https://discord.js.org)`,
                    inline: true,
                },
                {
                    name: 'Language',
                    value: 'JavaScript',
                    inline: true,
                },
                {
                    name: 'Hosting',
                    value: '[Railway](https://railway.app)',
                    inline: true,
                },
                {
                    name: 'Uptime',
                    value: prettyDate(process.uptime()),
                    inline: true,
                },
                {
                    name: 'Contributors',
                    value: '[auravoid#6669](https://auravoid.dev/), [FloatingMilkshake#7777](https://floatingmilkshake.com/)',
                    inline: false,
                },
                {
                    name: 'Source Code',
                    value: 'This is a closed source bot, so the source code is not available.',
                    inline: false,
                }
            );

        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
