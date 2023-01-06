import {
    ApplicationCommandType,
    Client,
    ColorResolvable,
    CommandInteraction,
    EmbedBuilder,
} from 'discord.js';
import { Command } from '@/Command';

const { BOT_COLOR } = process.env;

export const Ping: Command = {
    name: 'ping',
    description: 'Replies with some ping information.',
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const ping = Date.now() - (interaction.createdAt as any);
        const websocketPing = Math.round(interaction.client.ws.ping);

        const embed = new EmbedBuilder()
            .setColor(BOT_COLOR as ColorResolvable)
            .setTitle('🏓 Pong!')
            .setDescription(
                `Interaction latency is \`${ping}ms\`\nAPI Latency is \`${websocketPing}ms\``
            );

        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
