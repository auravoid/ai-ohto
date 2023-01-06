import { Command } from '@/Command';
import { UserData } from "@/helpers/UserData";
import { idToTimestamp } from '@helpers/Functions';
import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    ColorResolvable,
    CommandInteraction,
    EmbedBuilder
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
    run: async (client: Client, interaction: CommandInteraction) => {
        const target = interaction.options.getUser('user') ?? interaction.user;
        const userFetch = await target.fetch(true);
        const memberFetch = await interaction.guild!.members.fetch(target.id);

        const embed = new EmbedBuilder()
            .setColor(BOT_COLOR as ColorResolvable)
            .setThumbnail(userFetch.displayAvatarURL())
            .setFooter({
                text: `Requested by ${interaction.user.username
                    } at ${new Date().toLocaleTimeString('en-US')} UTC`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .addFields(
                {
                    name: 'Username',
                    value: `\`${target.username}#${target.discriminator}\``,
                    inline: true,
                },
                {
                    name: 'ID',
                    value: `\`${target.id}\``,
                    inline: true,
                },
                {
                    name: 'Created On',
                    value: `${idToTimestamp(
                        target.id as unknown as number,
                        'long-date'
                    )}`,
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

        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
