import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    ColorResolvable,
    CommandInteraction,
    EmbedBuilder, InviteResolvable,
} from 'discord.js';
import { Command } from '@/Command';
import { GuildData } from '@helpers/Functions';
const {
    BOT_COLOR
} = process.env;

export const Invite: Command = {
    name: 'invite',
    description: 'Get information about an invite link',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'code',
            description: 'The invite code to lookup',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
      ],
    run: async (client: Client, interaction: CommandInteraction) => {
        // @ts-ignore
        const code = interaction.options.getString('code');

        // Fetch the invite
        const invite: InviteResolvable | any = await interaction.client
            .fetchInvite(code, {
                // @ts-ignore
                force: true,
                cache: false,
                withCounts: true,
            })
            .catch((error) => {
                // If the invite is invalid, return an error message
                return interaction.reply({
                    content: `There was an error fetching the invite: ${error.message}`,
                    ephemeral: true,
                });
            });

        // If there is no invite, return an error message
        if (!invite.guild) return;

        // Create the embed for the invite
        const embed = new EmbedBuilder()
            .setTitle(`Invite for ${invite.guild.name}`)
            .setThumbnail(invite.guild.iconURL())
            .setColor(BOT_COLOR as ColorResolvable);

        // If the guild has X, add X to the embed
        if (invite.guild.description)
            embed.setDescription(invite.guild.description);
        if (invite.guild.premiumSubscriptionCount) {
            embed.addFields({
                name: 'Boosts',
                value: invite.guild.premiumSubscriptionCount.toString(),
                inline: true,
            });
        }
        if (invite.presenceCount) {
            embed.addFields({
                name: 'Online',
                value: invite.presenceCount.toString(),
                inline: true,
            });
        }

        if (invite.memberCount) {
            embed.addFields({
                name: 'Members',
                value: invite.memberCount.toString(),
                inline: true,
            });
        }

        embed.addFields({
            name: 'Invite',
            value: `[Click here to join](${invite.url})`,
            inline: true,
        });

        if (invite.guild.verificationLevel) {
            embed.addFields({
                name: 'Verification Level',
                value: GuildData.verificationLevel[
                    invite.guild.verificationLevel
                    ],
                inline: true,
            });
        }
        if (invite.guild.vanityURLCode) {
            embed.addFields({
                name: 'Vanity URL',
                value: `\`${invite.guild.vanityURLCode}\``,
                inline: true,
            });
        }
        if (invite.guild.banner) {
            embed.setImage(invite.guild.bannerURL({ size: 1024 }));
        }

        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
