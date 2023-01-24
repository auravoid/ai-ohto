import {
    ApplicationCommandType,
    ChatInputCommandInteraction,
    ColorResolvable,
    EmbedBuilder,
} from 'discord.js';
import { Command } from '@/Command';
import { execSync } from 'child_process';

const { version, homepage } = require('@/../package.json');

export const gitHash = execSync('git rev-parse --short HEAD', {
    encoding: 'utf-8',
}).trim();

const { BOT_COLOR } = process.env;

export const Version: Command = {
    name: 'version',
    category: 'General',
    description: "Check the bot's version.",
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: ChatInputCommandInteraction) => {
        const embed = new EmbedBuilder()
            .setTitle('Version')
            .setColor(BOT_COLOR as ColorResolvable)
            .setDescription(
                `The current version of the bot is \`v${version}\`.`
            )
            .addFields({
                name: 'Git Commit',
                value: `[\`${gitHash}\`](${homepage + '/commit/' + gitHash})`,
            });

        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
