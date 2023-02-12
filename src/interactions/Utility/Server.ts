import { Command } from '@/Command';
import { idToTimestamp } from '@helpers/Functions';
import { GuildData } from '@helpers/Classes';
import {
    ApplicationCommandType,
    ChatInputCommandInteraction,
    ColorResolvable,
    EmbedBuilder,
} from 'discord.js';

const { BOT_COLOR } = process.env;

export const Server: Command = {
    name: 'server',
    category: 'Utility',
    description: "Get this server's information",
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    run: async (interaction: ChatInputCommandInteraction) => {
        const guild = interaction.guild!;

        const embed = new EmbedBuilder()
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL())
            .addFields(
                {
                    name: 'Owner',
                    value: (
                        await guild.fetchOwner().then((owner) => owner.user.tag)
                    ).toString(),
                    inline: true,
                },
                {
                    name: 'ID',
                    value: `\`${guild.id}\``,
                    inline: true,
                },
                {
                    name: 'Created At',
                    value: idToTimestamp(
                        guild.id as unknown as number,
                        'short-date'
                    ) as string,
                    inline: true,
                },
                {
                    name: 'Boosts',
                    value: `Count: ${(
                        guild.premiumSubscriptionCount as number
                    ).toString()}\nTier: ${
                        GuildData.premiumTier[guild.premiumTier]
                    }`,
                    inline: false,
                },
                {
                    name: 'Verification Level',
                    value: GuildData.verificationLevel[guild.verificationLevel],
                    inline: true,
                }
            )
            .setColor(BOT_COLOR as ColorResolvable);

        if (guild.description) {
            embed.setDescription(guild.description);
        }

        if (guild.vanityURLCode) {
            embed.addFields({
                name: 'Vanity URL',
                value: guild.vanityURLCode,
                inline: false,
            });
        }

        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
