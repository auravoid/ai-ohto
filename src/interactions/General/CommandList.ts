import {
    ApplicationCommandType,
    ChatInputCommandInteraction,
    ColorResolvable,
    EmbedBuilder,
} from 'discord.js';
import { Command } from '@/Command';
import { Commands } from '@/Commands';

const { BOT_COLOR } = process.env;

export const CommandList: Command = {
    name: 'commands',
    description: 'Get a list of commands the bots has!',
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: ChatInputCommandInteraction) => {
        let commandString = '';

        for (const command of await Commands) {
            if (command.guildOnly) continue;
            if (command.type !== ApplicationCommandType.ChatInput) continue;
            commandString += `</${command.name}:${command.id}>${
                command.description ? ` - ${command.description}` : ''
            }\n`;
        }

        const embed = new EmbedBuilder()
            .setTitle('Commands')
            .setColor(BOT_COLOR as ColorResolvable)
            .setDescription(commandString);

        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
