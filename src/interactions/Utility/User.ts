import { Command } from '@/Command';
import { idToTimestamp } from '@helpers/Functions';
import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    Client,
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
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const target = interaction.options.getUser('user') ?? interaction.user;
        const userFetch = await target.fetch(true);
        const memberFetch = await interaction.guild!.members.fetch(target.id);

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

        if (userFetch.bannerURL()) {
            embed.setImage(
                userFetch.bannerURL({
                    size: 4096,
                }) as string
            );
        }

        if (userFetch.accentColor) {
            embed.setColor(userFetch.accentColor as ColorResolvable);
        }

        if (memberFetch) {
            embed.addFields(
                {
                    name: 'Nickname',
                    value: memberFetch.nickname || 'None',
                    inline: true,
                },
                {
                    name: 'Roles',
                    value: (memberFetch.roles.cache.size - 1).toString(),
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
