import { Command } from '@/Command';
import { dateToTimestamp, idToTimestamp } from '@helpers/Functions';
import { UserData } from '@helpers/Classes';
import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    ColorResolvable,
    EmbedBuilder,
} from 'discord.js';

const { BOT_COLOR } = process.env;

export const User: Command = {
    name: 'user',
    description: "Get a user's information",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            description: 'The user to get information about',
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],
    run: async (interaction: ChatInputCommandInteraction) => {
        const target = interaction.options.getUser('user') ?? interaction.user;
        const userFetch = await target.fetch(true);

        const embed = new EmbedBuilder()
            .setColor(BOT_COLOR as ColorResolvable)
            .setThumbnail(userFetch.displayAvatarURL())
            .setTitle(`${userFetch.username}#${userFetch.discriminator}`)
            .addFields(
                {
                    name: 'Created On',
                    value: `${idToTimestamp(
                        target.id as unknown as number,
                        'long-date'
                    )}`,
                    inline: true,
                },
                {
                    name: 'ID',
                    value: `\`${target.id}\``,
                    inline: true,
                }
            );

        if (userFetch.flags!.toArray().length > 0) {
            embed.addFields({
                name: 'User Flags',
                value: userFetch
                    .flags!.toArray()
                    .map((r) => {
                        return `${UserData.flags[r].name}`;
                    })
                    .join('\n '),
                inline: false,
            });
        }

        if (userFetch.bannerURL()) {
            embed.setImage(
                userFetch.bannerURL({
                    size: 4096,
                }) as string
            );
        }

        if (userFetch.accentColor) {
            embed.setColor(userFetch.accentColor);
        }

        // If user is in the guild, add more fields
        if (interaction.guild!.members.cache.get(target.id)) {
            const member = interaction.guild!.members.cache.get(target.id);
            embed.addFields(
                {
                    name: 'Joined Server On',
                    value: dateToTimestamp(
                        member!.joinedTimestamp as number,
                        'long-date'
                    ),
                    inline: true,
                },
                {
                    name: 'Nickname',
                    value: member!.nickname || 'None',
                    inline: true,
                },
                {
                    name: 'Roles',
                    value: (member!.roles.cache.size - 1).toString(),
                    inline: true,
                }
            );
        }

        if (target.id === interaction.client.user.id) {
            embed.addFields({
                name: "Hey That's Me!",
                value: `I'm in ${interaction.client.guilds.cache.size} servers! Use </about:1016817282212700252> to get more information about me!`,
                inline: false,
            });
        }
        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
