import {
    ApplicationCommandType,
    ChatInputCommandInteraction,
    ApplicationCommandOptionType,
    ColorResolvable,
    EmbedBuilder,
    ChannelType,
    GuildChannel,
    PermissionsBitField,
} from 'discord.js';
import { Command } from '@/Command';
import { set, get } from '@/helpers/RedisHelper';

const {
    COLOR_SUCCESS,
    COLOR_WARNING,
    COLOR_ERROR
} = process.env;

export const LoggerSetup: Command = {
    name: 'logger-setup',
    category: 'Settings',
    description: 'Configure your server log settings for the bot',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'log-channel',
            description: 'The channel to send logs to',
            type: ApplicationCommandOptionType.Channel,
            required: false,
        },
    ],
    async run(interaction: ChatInputCommandInteraction) {
        const logChannel = interaction.options.getChannel('log-channel', false);
        if (!logChannel) {
            const embed = new EmbedBuilder()
                .setTitle('Logger Setup')
                .setDescription('Please provide a channel to send logs to.')
                .setColor(COLOR_WARNING as ColorResolvable);
            return interaction.followUp({ embeds: [embed] });
        }

        const logChannelType = logChannel.type;
        if (logChannelType !== ChannelType.GuildText) {
            const embed = new EmbedBuilder()
                .setTitle('Logger Setup')
                .setDescription('Please provide a text channel to send logs to.')
                .setColor(COLOR_WARNING as ColorResolvable);
            return interaction.followUp({ embeds: [embed] });
        }

        const botPermissions = (logChannel as GuildChannel).permissionsFor(interaction.client.user.id);
        if (!botPermissions?.has(PermissionsBitField.Flags.SendMessages)) {
            const embed = new EmbedBuilder()
                .setTitle('Logger Setup')
                .setDescription('I do not have permission to send messages in that channel.')
                .setColor(COLOR_ERROR as ColorResolvable);
            return interaction.followUp({ embeds: [embed] });
        }

        const logChannelId = logChannel.id;
        await set(`guild:${interaction.guildId}:logChannel`, logChannelId);

        const embed = new EmbedBuilder()
            .setTitle('Logger Setup')
            .setDescription(`Successfully set log channel to <#${logChannelId}>`)
            .setColor(COLOR_SUCCESS as ColorResolvable);
        return interaction.followUp({ embeds: [embed] });
    }
}