import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    GuildMember,
} from 'discord.js';
import { Command } from '@/Command';
import { prettyNumber } from '@helpers/Functions';

export const Twitter: Command = {
    name: 'twitter',
    description: 'Create a fake Twitter embed!',
    options: [
        {
            name: 'message',
            description: 'The message of the tweet. (Use \\n for new lines)',
            type: ApplicationCommandOptionType.String,
            required: true,
            max_length: 280,
        },
        {
            name: 'image',
            description: 'An optionally attached image for the tweet.',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: ChatInputCommandInteraction) => {
        const username =
            (interaction.member as GuildMember)?.nickname ||
            interaction.user.username;
        let message = interaction.options.getString('message') as string;
        const image = interaction.options.getString('image');
        const likes = Math.floor(Math.random() * 10000);
        const retweets = Math.floor(Math.random() * likes);

        // Make sure media is a valid image
        if (image) {
            const mediaType = image.split('.').pop();
            if (!['png', 'jpg', 'jpeg', 'gif'].includes(mediaType as string)) {
                return interaction.editReply('Please provide a valid image.');
            }
        }

        message = message?.replace(/\\n/g, '\n');

        if (message.includes('http')) {
            const link = message.match(/http\S+/g) as unknown as string;
            message = message.replace(link, `[${link}](${link})`);
        }

        const embed = new EmbedBuilder()
            .setColor('#1DA1F2')
            .addFields(
                {
                    name: 'Likes',
                    value: prettyNumber(likes),
                    inline: true,
                },
                {
                    name: 'Retweets',
                    value: prettyNumber(retweets),
                    inline: true,
                }
            )
            .setFooter({
                text: 'Twitter',
                iconURL:
                    'https://abs.twimg.com/icons/apple-touch-icon-192x192.png',
            })
            .setAuthor({
                name: `${username} (@${interaction.user.username})`,
                iconURL: interaction.user.avatarURL() || undefined,
            })
            .setImage(image)
            .setDescription(message)
            .setTimestamp();

        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
